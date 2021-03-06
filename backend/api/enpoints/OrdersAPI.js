const mongoose = require('mongoose');
/* const User = mongoose.model('users'); */
const User = require('../.././model/User');
const Order = require('../.././model/Order');
var nodemailer = require('nodemailer');
var starttls=require('starttls');

module.exports = app => {
    
    app.get('/api/user', (req,res) => {
        User
            .find()
            .exec(function(err, users){
                if(err){
                    console.log('Error While processing get user requrest');
                    res.status(503).send('Something Bad happened');
                }
                res.json(users);
            })
    });


    app.post('/api/user', (req,res) => {
        User
            .create({
                "username" : req.body.username,
                "firstName": req.body.firstName,
                "lastname" : req.body.lastname
            }, (err, user) => {
                if(err) {
                    console.log(err);
                    res.status(400)
                        .send('Error creating User');
                }else{
                    res.status(201)
                        .json(user);
                }
            });
    });

    app.get('/api/getAllUsers', async (req,res) => {
        User.find()
        .exec((err, user) => {
            console.log(user);
            res.json(user);
        });
    })

    app.get('/api/user/:userId/orders', async (req,res) => {
       const userId = req.params.userId;
       if(! mongoose.Types.ObjectId.isValid(userId)){
            res.status(400).send('Invalid UserId');
       }
       console.log("userid " + userId);
        const userOrders 
            = Order.find({'user' : userId})
                .populate('product')
                .exec(function (err, orders) {
                    if (err){
                        console.log(err);
                    };
                    res.status(200).json(orders)
                });
    });


    var _addUserOrder = function(req, res, user){
        console.log(user);
        var availavleUserBalance = parseInt(user.wallet_balance);
        var totalCartPrice = parseInt(req.body.total_price);
		console.log(availavleUserBalance+" -- "+totalCartPrice);
        if(availavleUserBalance >= totalCartPrice){
            user.wallet_balance = availavleUserBalance - totalCartPrice;
        }else{
            res.status(500)
                 .json({
                    "message"  : "insufficient funds"
                 });
				 return;
        }
        
        const order = new Order({
            'user' : user._id,
            'total_price' : totalCartPrice,
            'status' : req.body.status,
            'address' : req.body.address,
			'product' : req.body.productId
        });

        order.save((err, newlyCreatedOrder) => {
            if(err) {
                res.status(500)
                    .json(err);
            }else{
                res.status(201)
                    .json({
                    "message"  : "success"
                 });
            }
        })
    }

    app.post('/api/user/:userId/orders', (req,res) => {
        const userId = req.params.userId;
        if(! mongoose.Types.ObjectId.isValid(userId)){
             res.status(400).send('Invalid UserId');
        }
        if(!userId) {
            res.status(404)
                 .json({
                    "message"  : "User does not exits"
                 });
        }
        User
            .findById(userId)
            .exec((err, user) => {
                var response = {
                    status : 200,
                    message : []
                }
                if(err){
                    console.log(err);
                    res.status(500)
                    .json({"message"  : "something bad happened"});
                }else if(! user){
                    res.status(404)
                    .json({"message"  : "User does not exits"});
                }else if(user){
                    _addUserOrder(req,res,user);
                }
            });
    });
	
	
app.post('/api/sendMail', (req,res) => {
         var to = req.body.to;
         var from = req.body.from;
         var subject = req.body.subject;
		 var body= req.body.bodyText;
		 
		 var transporter = nodemailer.createTransport({
         host: '172.21.74.17',
         port: '25',
         secure: false,
         debug:true,
         auth: {
         user: 'no-reply@smtp.pidc.com',
         pass: 'India1234',
  },
  tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
  from: from,
  to: to,
  subject: subject,
  text: body
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

		 
         
         console.log(to + " " + from  + " " + subject);
         
         res.status(200)
            .json({"message"  : "Mail Send Successfully"});
});
}
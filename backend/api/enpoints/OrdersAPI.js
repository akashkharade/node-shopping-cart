const mongoose = require('mongoose');
/* const User = mongoose.model('users'); */
const User = require('../.././model/User');

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
       console.log("userid " + userId);
       User.findById(userId)
            .exec((err, user) => {
                if(err) {
                    console.log(err);
                    res.status(500)
                    .json({"message"  : "something bad happened"});
                }
                if(!user){
                    res.status(404)
                       .json({"message"  : "User does not exits"});
                }else{
                    res.json(user.orders);
                }
            })
    });


    var _addUserOrder = function(req, res, user){
        console.log(user);
        var availavleUserBalance = parseInt(user.wallet_balance);
        var totalCartPrice = parseInt(req.body.total_price);
        if(availavleUserBalance >= totalCartPrice){
            user.wallet_balance = availavleUserBalance - totalCartPrice;
        }else{
            res.status(401)
                 .json({
                    "message"  : "insufficient funds"
                 });
				 return;
        }
        
        user.orders.push({
            'total_price' : totalCartPrice,
            'status' : req.body.status,
            'address' : req.body.address,
			'productId' : req.body.productId
        });

        user.save((err, userUpdated) => {
            if(err) {
                res.status(500)
                    .json(err);
            }else{
                res.status(201)
                    .json(userUpdated);
            }
        })
    }

    app.post('/api/user/:userId/orders', (req,res) => {
        console.log('post called');
        const userId = req.params.userId;
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

}
const mongoose = require('mongoose');
/* const User = mongoose.model('users'); */
var User=require('../.././model/User');

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

    app.get('/api/user/:userId/orders', (req,res) => {
       const userId = req.params.userId;
       User
            .findById(userId)
            .select('orders')
            .exec((err, user) => {
                res.json(user.orders);
            });
        
    });

    var _addUserOrder = function(req, res, user){
        var availavleUserBalance = user.wallet_balance;
        var totalCartPrice = req.body.total_price;
        if(availavleUserBalance >= req.body.total_price){
            user.wallet_balance = availavleUserBalance - totalCartPrice;
        }else{
            res.status(401)
                 .json({
                    "message"  : "insufficient funds"
                 });
        }
        
        user.orders.push({
            'total_price' : totalCartPrice,
            'status' : req.body.status,
            'products': req.body.products,
            'address' : req.body.address
        });

        user.save((err, userUpdated) => {
            if(err) {
                res.status(500)
                    .json(err);
            }else{
                res.status(201)
                    .json(userUpdated.orders[userUpdated.orders.length -1]);
            }
        })
    }

    app.post('/api/user/:userId/orders', (req,res) => {
        const userId = req.params.userId;
        User
            .findById(userId)
            .select('orders')
            .exec((err, user) => {
                var response = {
                    status : 200,
                    message : []
                }

                if(err){
                    response.status = 500;
                    response.message = err;
                }else if(! user){
                    response.status = 400;
                    response.message = 'User does not exits';
                }else if(user){
                    _addUserOrder(req,res,user);
                }
            });
    });
}
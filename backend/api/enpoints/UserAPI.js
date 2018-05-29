const express = require('express');
const router = express.Router();
const HttpStatus=require('http-status-codes');
var User=require('../.././model/User');
const mongoose = require("mongoose");

// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        username: req.body.username,
        password: req.body.password
    };
    res.status(201).json({
        message: 'User was created',
        order: order
    });
});


router.post('/login', (req, res, next) => {

	var username=req.body.username;
	var password=req.body.password;
	console.log(username);
	console.log(password);
	
	var query = User.findOne({'username':username},function(err,data){
	    if(err)
	        console.log(err);
	    else
	    	{
	    	if(data!=null)
	    		{
	    	if(data.username===username&&data.password===password)
	    		{
	    		res.status(HttpStatus.OK).json({
	    	        message: 'Handling POST requests to /login',
	    	        createdUser: data
	    	    });
	    		}
	    	else{
	    		res.status(HttpStatus.BAD_REQUEST).json({
	    	        message: 'Invalid Credentials...'
	    	    });
	    	}
	    		}
	    	else{
	    		res.status(HttpStatus.NOT_FOUND).json({
	    	        message: 'User not found'
	    	    });
	    		
	    	}
	    	}
	    	
	    });
	
    
    
});
router.get('/:userid/wallet', (req, res, next) => {
	const id = req.params.userId;
	User.findById(id, function (err, user) {
		if (!err) {
			res.status(200).json(user.wallet_balance);
		} else {
			return console.log(err);
		}
	});
});

router.put('/:userid/wallet', (req, res, next) => {
	var walletAmount=req.body.walletAmount;
	const id = req.params.userId;
	User.findById(id, function (err, user) {
		user.wallet_balance = walletAmount;
		if (!err) {
			User.findByIdAndUpdate(id, user, {new: true}, function(err, model) {
				res.status(200).json(model.wallet_balance);
			});
		} else {
			return console.log(err);
		}
	});
});
router.get('/:userid', (req, res, next) => {
   
	const id = req.params.userId;

		var query = User.findOne({'_Id':id},function(err,data){
		    if(err)
		        console.log(err);
		    else
		    	{
		    	if(data!=null)
		    		{
		           res.status(200).json({
                   message: data,
        
    });
		    	}
		    		
		    	else{
		    		res.status(HttpStatus.NOT_FOUND).json({
		    	        message: 'User not found'
		    	    });
		    		
		    	}
		    	}
		    	
		    });
});

router.post('/registeration', (req, res, next) => {
	console.log("registeration called..");
    var users = User({
      username: req.body.username,
        password: req.body.password,
		firstName:req.body.firstName,
		lastname:req.body.lastname,
		email:req.body.email,
		wallet_balance:'100'
    });
   // save the user
    users.save(function(err) {
      if (err) throw err;
    
    res.status(201).json({
        message: 'Registeration done successfully.Please log in to continue',
        createdUser: users
    });

    });
});


router.delete('/:userid', (req, res, next) => {
    res.status(200).json({
        message: 'User deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();

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

router.get('/:userid', (req, res, next) => {
    res.status(200).json({
        message: 'User details',
        orderId: req.params.userid
    });
});

router.delete('/:userid', (req, res, next) => {
    res.status(200).json({
        message: 'User deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;
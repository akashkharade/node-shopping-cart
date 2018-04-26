const express = require('express');
const router = express.Router();
var Products = require('../../model/Products');

// Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    var catalog = null;
    Products.find({}, function(err, product) {
        if (err) throw err;
      
        catalog = product;

        res.status(200).json(catalog);

    });
    
});
module.exports = router;
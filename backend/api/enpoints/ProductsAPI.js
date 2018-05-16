const express = require('express');
const router = express.Router();
var Products = require('../../model/Products');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Products.findById(id, function (err, product) {
		if (!err) {
			res.status(200).json(product);
		} else {
			return console.log(err);
		}
	});
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;
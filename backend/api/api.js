var express = require('express');
var router = express.Router();
var DBinit = require('../db/DBInit');
var db = require('../db/mongDB');
var Products = require('../model/Products');

router.get('/', (req, res, next) => {
  var apiInfo = {
    name:"Nodesjs Shhopping Cart API",
    version:"1.0.0"
 }  

  res.status(200).json(apiInfo);
});

router.post('/reset', (req, res, next) => {
  var products = DBinit.products;
  for(var i=0; i<products.length; i++){
    var p = products[i];
    var product = Products({
      name: p.name,
      imgName:p.imgName,
      describtion:p.describtion,
      price:p.price
    });
    
    // save the user
    product.save(function(err) {
      if (err) throw err;
    
      console.log('Product  created!',p);

    });
  }
  res.status(201).json({
      message: 'Rest the DB',
      data:DBinit
  });
});

module.exports = router;

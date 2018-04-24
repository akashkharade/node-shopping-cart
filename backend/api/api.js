var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,next) {
  var apiInfo = {
     name:"Nodesjs Shhopping Cart API",
     version:"1.0.0"
  }  
 
  next();
  res.send(apiInfo);
});

module.exports = router;

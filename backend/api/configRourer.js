
var apiRouter = require('./api');
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");


var config = [
    {path:'/api', router:apiRouter},{path:"/products", router:productRoutes},{path:"/orders", router:orderRoutes}
];

var apiRouterConfigure = function(app){
    for(var i=0; i< config.length; i++){
        app.use(config[i].path, config[i].router);
    }
}

module.exports = apiRouterConfigure;
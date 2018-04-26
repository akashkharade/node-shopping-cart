
var API = require('./API');
const ProductsAPI = require("./enpoints/ProductsAPI");
const OrdersAPI = require("./enpoints/OrdersAPI");
const CatalogAPI = require("./enpoints/CatalogAPI");
const UserAPI = require("./enpoints/UserAPI");


var config = [
    {path:'/api', router:API},
    {path:"/api/products", router:ProductsAPI},
    {path:"/api/orders", router:OrdersAPI},
    {path:"/api/catalogs", router:CatalogAPI},
    {path:"/api/users", router:UserAPI}
];

var apiRouterConfigure = function(app){
    for(var i=0; i< config.length; i++){
        app.use(config[i].path, config[i].router);
    }
}

module.exports = apiRouterConfigure;
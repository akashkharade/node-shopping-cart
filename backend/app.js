const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const mongdb = require('./db/mongDB');
const apiRouterConfigure = require('./api/configRourer');
var db = new mongdb();
db.init();


//register models
require('./model/User');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
apiRouterConfigure(app);
require('./api/enpoints/OrdersAPI')(app);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

/*
const PORT = process.env.PORT || 5000 ;
app.listen(PORT);
*/
module.exports = app;

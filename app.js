const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")

const usersRoutes = require("./api/routes/users");
const studentsRoutes = require("./api/routes/students");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// app.use((req,resp,next)=>{
//     resp.header('Access-Control-Allow-Origin',"*")
//     resp.header('Access-Control-Allow-header',"Origin")

//     if(req.method = "OPTIONS"){
//         resp.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE')
//         return resp.status(200).json();
//     }
//     next();
// })

app.use("/users", usersRoutes);
app.use("/students", studentsRoutes);

app.use((req, resp, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, resp, next) => {
  resp.status(error.status || 500);
  resp.json({
    message: error.message,
  });
});

module.exports = app;

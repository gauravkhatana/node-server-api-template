const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kumartech0102:node0102@cluster.scdz9q0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster"
  )
  .then((_) => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log( error.message);
  });

// const uri = "mongodb+srv://kumartech0102:Mongodb0102@cluster.scdz9q0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("test").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

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

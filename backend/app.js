const express = require("express");
const bodyparser = require("body-parser");

const mongoose = require("mongoose");
const app = express();
//const postRoutes = require("./routes/posts");
const clienteRoutes = require("./routes/clientes");

// mongoose.set('useCreateIndex', true)
mongoose
  .connect(
    "mongodb+srv://CoffeesAD:JoroAnDa2019@practica.nx7bwcj.mongodb.net/node-angularJRAD?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Base de Datos Conectada");
  })
  .catch(() => {
    console.log("Conexion Fallida :(");
  });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

//app.use("/api.posts", postRoutes);
app.use("/api.clientes", clienteRoutes);

module.exports = app;

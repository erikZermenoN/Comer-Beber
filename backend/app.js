const path = require("path")
const express = require("express");
const bodyparser = require("body-parser");

const mongoose = require("mongoose");
const app = express();
//const postRoutes = require("./routes/posts");
const clienteRoutes = require("./routes/clientes");
const pedidoRoutes = require("./routes/pedidos");
const consumibleRoutes = require("./routes/consumibles");
const detaPediRoutes = require("./routes/detallePedidos");
const empleadoRoutes = require("./routes/empleados");

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
app.use("/images", express.static(path.join("backend/images")));

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
app.use("/api.pedidos", pedidoRoutes);
app.use("/api.consumibles", consumibleRoutes);
app.use("/api.detallePedidos", detaPediRoutes);
app.use("/api.empleados", empleadoRoutes);

module.exports = app;

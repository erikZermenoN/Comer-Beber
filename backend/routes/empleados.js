const express = require("express");
const Empleado = require("../models/empleado");

const router = express.Router();

// router.post("", (req, res, next) => {
//   const cliente = new Cliente({
//     nombre: req.body.nombre,
//     mesa: req.body.mesa,
//     fecha: req.body.fecha,
//   });
//   cliente.save().then((createdClient) => {
//     res.status(201).json({
//       message: "Cliente agregado correctamente",
//       idCliente: createdClient._id,
//     });
//   });
// });

// router.put("/:id", (req, res, next) => {
//   const cliente = new Cliente({
//     _id: req.body.id,
//     nombre: req.body.nombre,
//     mesa: req.body.mesa,
//     fecha: req.body.fecha,
//   });
//   Cliente.updateOne({ _id: req.params.id }, cliente).then((result) => {
//     console.log(result);
//     res.status(200).json({
//       message: "Actualizacion con exito!",
//     });
//   });
// });

// router.get("", (req, res, next) => {
//   Cliente.find().then((documents) => {
//     res.status(200).json({
//       message: "Clientes expuestos con exito!",
//       posts: documents,
//     });
//   });
// });

router.put("", (req, res, next) => {
  Empleado.findOne(
    { usuario: req.body.usuario },
    { contrasena: req.body.contrasena }
  ).then((document) => {
    if (document) {
      res
        .status(200)
        .json({ message: "Empleado encontrado", idEmpleado: document._id });
    } else {
      res.status(404).json({ message: "Empleado o contraseña incorrectos" });
    }
  });
});

// router.delete("/:id", (req, res, next) => {
//   Cliente.deleteOne({ _id: req.params.id })
//     .then(() => {
//       res.status(200).json({
//         message: "Cliente eliminado correctamente ",
//       });
//     })
//     .catch(() => {
//       res.status(404).json({
//         message: "Cliente no eliminado",
//       });
//     });
// });

module.exports = router;

const express = require("express");
const { createShorthandPropertyAssignment } = require("typescript");
const { create } = require("../models/post");
const Cliente = require("../models/post");

const router = express.Router();

router.Cliente("", (req, res, next) => {
  const cliente = new Cliente({
    nombre: req.body.nombre,
    mesa: req.body.mesa,
    fecha: req.body.fecha
  });
  cliente.save().then((createdClient) => {
    res.status(201).json({
      message: "Cliente agregado correctamente",
      postId: createdClient._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const cliente = new Cliente({
    _id: req.body.id,
    nombre: req.body.nombre,
    mesa: req.body.mesa,
    fecha: req.body.fecha
  });
  Cliente.updateOne({ _id: req.params.id }, cliente).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Actualizacion con exito!",
    });
  })
});

router.get("", (req, res, next) => {
  Cliente.find().then((documents) => {
    res.status(200).json({
      message: "Clientes expuestos con exito!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Cliente.findById(req.params.id).then(cliente => {
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  })
});

router.delete("/:id", (req, res, next) => {
  Cliente.deleteOne({_id: req.params.id})
  .then(() => {
    res.status(200).json({
      message: "Cliente eliminado correctamente ",
    });
  })
  .catch(() => {
    res.status(404).json({
      message: "Cliente no eliminado",
    });
  });
});

module.exports = router;
const express = require("express");
const { createShorthandPropertyAssignment } = require("typescript");
const Pedido = require("../models/pedido");

const router = express.Router();

router.post("", (req, res, next) => {
  const pedido = new Pedido({
    idCliente: req.body.idCliente,
    fecha: req.body.fecha,
    precioTotal: req.body.precioTotal,
  });
  pedido.save().then((createdOrder) => {
    res.status(201).json({
      message: "Pedido agregado correctamente",
      idPedido: createdOrder._id,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const pedido = new Pedido({
    _id: req.body.id,
    fecha: req.body.fecha,
    precioTotal: req.body.precioTotal,
  });
  Pedido.updateOne({ _id: req.params.id }, pedido).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Actualizacion con exito!",
    });
  });
});

router.get("/cliente/:id", (req, res, next) => {
  Pedido.find({ idCliente: req.params.id }).then((documents) => {
    res.status(200).json({
      message: "Pedidos expuestos con exito!",
      pedidos: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Pedido.findById(req.params.id).then((pedido) => {
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Pedido.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Pedido eliminado correctamente",
      });
    })
    .catch(() => {
      res.status(404).json({
        message: "Pedido no eliminado",
      });
    });
});

module.exports = router;

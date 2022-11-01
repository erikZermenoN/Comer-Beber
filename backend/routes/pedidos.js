const express = require("express");
const { createShorthandPropertyAssignment } = require("typescript");
const { create } = require("../models/post");
const Pedido = require("../models/post");

const router = express.Router();

router.pedido("", (req, res, next) => {
  const pedido = new Pedido({
    fecha: req.body.fecha,
    precioTotal: req.body.precioTotal
  });
  pedido.save().then((createdOrder) => {
    res.status(201).json({
      message: "Pedido agregado correctamente",
      postId: createdOrder._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const pedido = new Pedido({
    _id: req.body.id,
    fecha: req.body.fecha,
    precioTotal: req.body.precioTotal
  });
  Pedido.updateOne({ _id: req.params.id }, pedido).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Actualizacion con exito!",
    });
  })
});

router.get("", (req, res, next) => {
  Pedido.find().then((documents) => {
    res.status(200).json({
      message: "Pedido expuestos con exito!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Pedido.findById(req.params.id).then(pedido => {
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido no encontrado' });
    }
  })
});

router.delete("/:id", (req, res, next) => {
  Pedido.deleteOne({_id: req.params.id})
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
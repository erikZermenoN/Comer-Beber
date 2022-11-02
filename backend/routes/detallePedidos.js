const express = require("express");
const { createShorthandPropertyAssignment } = require("typescript");
const DetallePedido = require("../models/detallePedido");

const router = express.Router();

router.post("", (req, res, next) => {
  const detallePedido = new DetallePedido({
    idPedido: req.body.idPedido,
    idConsumible: req.body.idConsumible,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
  });
  detallePedido.save().then((createdOrderDetail) => {
    res.status(201).json({
      message: "DetallePedido agregado correctamente",
      postId: createdOrderDetail._id,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const detallePedido = new DetallePedido({
    _id: req.body.id,
    idPedido: req.body.idPedido,
    idConsumible: req.body.idConsumible,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
  });
  DetallePedido.updateOne({ _id: req.params.id }, detallePedido).then(
    (result) => {
      console.log(result);
      res.status(200).json({
        message: "Actualizacion con exito!",
      });
    }
  );
});

router.get("", (req, res, next) => {
  DetallePedido.find().then((documents) => {
    res.status(200).json({
      message: "DetallePedidos expuestos con exito!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  DetallePedido.findById(req.params.id).then((detallePedido) => {
    if (detallePedido) {
      res.status(200).json(detallePedido);
    } else {
      res.status(404).json({ message: "DetallePedido no encontrado" });
    }
  });
});

router.get("/pedido/:id", (req, res, next) => {
  DetallePedido.find({ idPedido: req.params.id }).then((documents) => {
    res.status(200).json({
      message: "DetallePedidos expuestos con exito!",
      detallePedidos: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  DetallePedido.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "DetallePedido eliminado correctamente",
      });
    })
    .catch(() => {
      res.status(404).json({
        message: "DetallePedido no eliminado",
      });
    });
});

module.exports = router;

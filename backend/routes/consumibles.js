const express = require("express");
const { createShorthandPropertyAssignment } = require("typescript");
const { create } = require("../models/post");
const Consumible = require("../models/post");

const router = express.Router();

router.consumible("", (req, res, next) => {
  const consumible = new Consumible({
    nombre: req.body.nombre,
    ingredientes: req.body.ingredientes,
    imagen: req.body.imagen,
    precio: req.body.precio,
    tipo: req.body.tipo
  });
  consumible.save().then((createdConsumable) => {
    res.status(201).json({
      message: "Consumible agregado correctamente",
      postId: createdConsumable._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const consumible = new Consumible({
    _id: req.body.id,
    nombre: req.body.nombre,
    ingredientes: req.body.ingredientes,
    imagen: req.body.imagen,
    precio: req.body.precio,
    tipo: req.body.tipo
  });
  Consumible.updateOne({ _id: req.params.id }, consumible).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Actualizacion con exito!",
    });
  })
});

router.get("", (req, res, next) => {
  Consumible.find().then((documents) => {
    res.status(200).json({
      message: "Consumibles expuestas con exito!",
      posts: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Consumible.findById(req.params.id).then(consumible => {
    if (consumible) {
      res.status(200).json(consumible);
    } else {
      res.status(404).json({ message: 'Consumible no encontrado' });
    }
  })
});

router.delete("/:id", (req, res, next) => {
  Consumible.deleteOne({_id: req.params.id})
  .then(() => {
    res.status(200).json({
      message: "Consumible eliminado correctamente",
    });
  })
  .catch(() => {
    res.status(404).json({
      message: "Consumible no eliminado",
    });
  });
});

module.exports = router;
const express = require("express");
const multer = require("multer");
const Consumible = require("../models/consumible");

const router = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Extensión no valida");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const consumible = new Consumible({
      nombre: req.body.nombre,
      ingredientes: req.body.ingredientes,
      imagen: url + "/images/" + req.file.filename,
      precio: req.body.precio,
      tipo: req.body.tipo,
    });
    consumible
      .save()
      .then((createdConsumible) => {
        res.status(201).json({
          message: "Consumible agregado correctamente",
          consumible: {
            ...createdConsumible,
            id: createdConsumible._id,
          },
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "El consumible no a sido posible agregarlo",
          error: error,
        });
      });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let image = req.body.imagen;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      image = url + "/images/" + req.file.filename;
    }
    const consumible = new Consumible({
      _id: req.body.id,
      nombre: req.body.nombre,
      ingredientes: req.body.ingredientes,
      imagen: image,
      precio: req.body.precio,
      tipo: req.body.tipo,
    });
    Consumible.updateOne({ _id: req.params.id }, consumible)
      .then((result) => {
        res.status(200).json({
          message: "Actualizacion con exito",
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "La actualizacion a fallado",
        });
      });
  }
);

router.get("", (req, res, next) => {
  Consumible.find().then((documents) => {
    res.status(200).json({
      message: "Consumibles expuestos con exito!",
      consumibles: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Consumible.findById(req.params.id).then((consumible) => {
    if (consumible) {
      res.status(200).json(consumible);
    } else {
      res.status(404).json({ message: "Consumible no encontrado" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Consumible.deleteOne({ _id: req.params.id })
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

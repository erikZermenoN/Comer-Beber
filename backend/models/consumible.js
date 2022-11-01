const mongoose = require("mongoose");

// Creacion del esquema de consumibles
const consumibleSchema = mongoose.Schema({
    nombre: { type: String, require: true },
    ingredientes: { type: String, require: true },
    imagen: { type: String, require: true },
    precio: { type: Number, require: true },
    tipo: { type: String, require: true },
  });

module.exports = mongoose.model("Consumible", consumibleSchema);
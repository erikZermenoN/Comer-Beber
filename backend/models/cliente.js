const mongoose = require("mongoose");

// Creacion del esquema cliente
const clienteSchema = mongoose.Schema({
  nombre: { type: String, require: true },
  mesa: { type: Number, require: true },
  fecha: { type: String, require: true },
});

module.exports = mongoose.model("Cliente", clienteSchema);

const mongoose = require("mongoose");

// Creacion del esquema empleado
const empleadoSchema = mongoose.Schema({
  usuario: { type: String, require: true },
  contrasena: { type: Number, require: true },
});

module.exports = mongoose.model("Empleado", empleadoSchema);

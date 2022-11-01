const mongoose = require("mongoose");

// Creacion del esquema de pedidos
const pedidoSchema = mongoose.Schema(
  {
    idCliente: { type: mongoose.Types.ObjectId },
    fecha: { type: String, require: true },
    precioTotal: { type: Number, require: true },
  }
  // {
  //     timestamps: true
  // }
);

module.exports = mongoose.model("Pedido", pedidoSchema);
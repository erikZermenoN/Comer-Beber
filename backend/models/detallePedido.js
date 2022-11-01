const mongoose = require("mongoose");

// Creacion del esquema sobre el detalle del pedido
const detallePedidoSchema = mongoose.Schema({
    idPedido: { type: mongoose.Types.ObjectId },
    idConsumible: { type: mongoose.Types.ObjectId },
    precio: { type: Number, require: true },
    cantidad: { type: Number, require: true },
  });

  module.exports = mongoose.model("DetallePedido", detallePedidoSchema);
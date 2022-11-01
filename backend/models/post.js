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

// Creacion del esquema de consumibles
const consumibleSchema = mongoose.Schema({
  nombre: { type: String, require: true },
  ingredientes: { type: String, require: true },
  imagen: { type: String, require: true },
  precio: { type: Number, require: true },
  tipo: { type: String, require: true },
});

// Creacion del esquema sobre el detalle del pedido
const detallePedidoSchema = mongoose.Schema({
  idPedido: { type: mongoose.Types.ObjectId },
  idConsumible: { type: mongoose.Types.ObjectId },
  precio: { type: Number, require: true },
  cantidad: { type: Number, require: true },
});

// Creacion del modelo Pedido, Consumible y DetallePedido
module.exports = mongoose.model("Pedido", pedidoSchema);
module.exports = mongoose.model("Consumible", consumibleSchema);
module.exports = mongoose.model("DetallePedido", detallePedidoSchema);

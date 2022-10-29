const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    //idConsumible: {type: Number, require: true}
    nombre: {type: String, require: true},
    ingredientes: {type: String, require: true},
    imagen: {type: String, require: true},
    precio: {type: Number, require: true},
    tipo: {type: String, require: true},

    //idPedido: {type: String, require: true},
    cliente: {type: String, require: true},
    mesa: {type: String, require: true},
    //idConsumible: {type: Number, require: true},
    precioTotal: {type: Number, require: true},
});

module.exports = mongoose.model('Post', postSchema);
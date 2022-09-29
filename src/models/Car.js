const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    image: {type: String},
    marca: {type: String, required: true},
    modelo: {type: String, required: true},
    placa: {type: String, required: true},
    opcionais: [{type: String}],
    cambio: {type: String, required: true},
    cor: {type: String, required: true},
    valor: {type: Number, required: true},
    cliente: {type: String}
})

module.exports = mongoose.model('Car', carSchema)
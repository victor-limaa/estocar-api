const mongoose = require('mongoose')

const clienteSchema = mongoose.Schema({
    nome: {type: String, required: true},
    whatsapp: {type: Number, required: true},
    email: {type: String, required: true}
})

module.exports = mongoose.model('Cliente', clienteSchema)
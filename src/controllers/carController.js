const Car = require('../models/Car')
const User = require('../models/User')
const Cliente = require('../models/Cliente')

carController = {
    cadastrar: async function (req, res) {

        const selectedCar = await Car.findOne({placa: req.body.placa})
        if(selectedCar) return res.status(400).send('Veículo já cadastrado!')

        const car = new Car({
            image: req.body.image,
            marca: req.body.marca ,
            modelo: req.body.modelo,
            placa: req.body.placa,
            opcionais: req.body.opcionais,
            cambio: req.body.cambio,
            cor: req.body.cor,
            valor: req.body.valor,
            cliente: null
        })

        try{
            const savedCar = await car.save()
            res.send(savedCar)
        } catch(err){
            res.send(err)
        }
    },

    listar: async function (req, res, next){
        
        if(req.params.placa){
            try{
                const carro = await Car.findOne({placa: req.params.placa})
                res.status(200).send(carro)
            } catch{
                next()
            }
        }
        
        try{
            const carros = await Car.find({})
            res.status(200).send(carros)
        } catch (err){
            res.status(400).send(err)
        }
    },

    visualizar: async function (req, res){
        try{const viewCar = await Car.findOne({_id: req.params.id})
        res.status(200).send(viewCar)}
        catch(err){
            res.status(400).send(err)
        }
    },

    deletar: async function(req, res){
        try{
            const selectedCar = await Car.findOne({_id: req.params.id})
            deletedCar = await selectedCar.remove()
            res.send(deletedCar)
        } catch(err){
            res.send(err)
        }
    },

    reservar: async function (req, res){


        const cliente = new Cliente({
            nome: req.body.nome,
            whatsapp: req.body.whatsapp,
            email: req.body.email
        })

        const clienteSaved = await cliente.save()
        const selectedCar = await Car.findOne({_id: req.params.id})

        try {
            const carReserved = await selectedCar.set({cliente: clienteSaved.nome})
            res.send(carReserved)
        } catch(err){
            res.send(err)
        }
    }
}

module.exports = carController
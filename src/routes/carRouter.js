const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')
const bodyParser = require('body-parser')

router.get('/home', bodyParser.json(), carController.listar)
router.get('/home/:placa', bodyParser.json(), carController.listar)

router.get('/:id', bodyParser.json(), carController.visualizar)

router.delete('/:id', bodyParser.json(), carController.deletar)

router.post('/newCar', carController.cadastrar)

router.post('/:id/reservar', carController.reservar)


module.exports = router
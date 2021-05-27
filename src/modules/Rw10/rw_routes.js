const express = require('express')
const Route = express.Router()

const rwController = require('../Rw10/rw_controller')

Route.get('/', rwController.getAllData)
Route.get('/sort/', rwController.getDataSort)
Route.get('/:id', rwController.getDataId)

Route.post('/', rwController.postData)

Route.patch('/:id', rwController.updateData)
Route.patch('/vaksin/:id', rwController.updateVaksin)
Route.delete('/:id', rwController.deleteData)

module.exports = Route

const express = require('express')
const restful = require('node-restful')
const server  = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

// MIDDLEWARES
server.use(bodyParser.urlencoded({extendend: true}))
server.use(bodyParser.json())
server.use(cors())

//ODM -- mapeamento objeto documento
const Client = restful.model('Client', {
    name: {type: String, require: true}
})

//Rest api
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')

//Teste
//server.get('/', (req, res, next) => res.send('Backoficce'))

server.listen(3000)
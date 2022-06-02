const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const server = express()

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

server.post('/', (req, res) => {
  const assunto = req.body.assunto
  const mensagem = req.body.mensagem

  res.send(200, `Mensagem enfileirada! Assunto: ${assunto} Mensagem: ${mensagem}`)

})

// Start Server
server.listen(8080)
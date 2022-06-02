const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/database-connection')

const server = express()

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

server.get('/', async (_, res) => {
  res
    .status(200)
    .send('Servidor funcionando!')
})

server.post('/', async (req, res) => {
  const assunto = req.body.assunto
  const mensagem = req.body.mensagem

  try {
    await db.query('INSERT INTO emails(assunto, mensagem) VALUES($1, $2)', [assunto, mensagem])
  } catch (error) {
    new Error('Ocorreu um erro ao registrar a mensagem')
  }
  
  res
    .status(200)
    .send(200, `Mensagem enfileirada! Assunto: ${assunto} Mensagem: ${mensagem}`)

})

// Start Server
server.listen(8080, console.log('Servidor rodando na porta 8080'))
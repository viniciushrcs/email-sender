const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/database-connection");
const redis = require('redis');


const server = express();

// Redis
const client = redis.createClient({
  url: 'redis://@queue:6379/0'
});

client.on('error', (err) => console.log('Redis Client Error', err));


// Middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

server.get("/", async (_, res) => {
  res.status(200).send("Servidor funcionando!");
});

server.post("/", async (req, res) => {
  const assunto = req.body.assunto;
  const mensagem = req.body.mensagem;

  try {
    await client.connect()
    const msg = { assunto, mensagem } 
    await client.rPush('sender', JSON.stringify(msg))
    await db.query("INSERT INTO emails(assunto, mensagem) VALUES($1, $2)", [
      assunto,
      mensagem,
    ]);
    console.log('Mensagem registrada!')
  } catch (error) {
    new Error("Ocorreu um erro ao registrar a mensagem");
  }

  res
    .status(200)
    .send(
      `Mensagem enfileirada! Assunto: ${assunto} Mensagem: ${mensagem}`
    );
});

// Start Server
server.listen(8080, console.log("Servidor rodando na porta 8080"));

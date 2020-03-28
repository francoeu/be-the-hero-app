const express = require('express');
const cors = require('cors') // Módulo de segurança - determina quem pode acessar a aplicação
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());  // Para interpretar requisições com dados em JSON e convertê-los em um Objeto Javascript
app.use(routes);



app.listen(3333);
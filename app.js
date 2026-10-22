const express = require('express');
const clienteRouter = require('./routes/clienteRouter');
const app = express();

app.use(express.json());
app.use('/clientes', clienteRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta 3000`);
});
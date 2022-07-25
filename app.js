const express = require('express');
const routes = require('./routes/productsRoute');

const app = express();

const port = 3001

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`pai ta on na porta ${port}`);
})
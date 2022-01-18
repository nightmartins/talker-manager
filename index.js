const express = require('express');
const bodyParser = require('body-parser');
const getTalker = require('./middlewares/getTalker');
const getTalkerById = require('./middlewares/getTalkerById');
const login = require('./middlewares/login');
const createTalker = require('./middlewares/createTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', getTalker);

app.get('/talker/:id', getTalkerById);

app.post('/login', login);

app.post('/talker', createTalker);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

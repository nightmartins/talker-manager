const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

function isEmailValid(email) {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email) === true;
}

function login(req, res) {
  const { email, password } = req.body;
  const token = generateToken();

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isEmailValid(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  res.status(200).json({ token });
}

module.exports = login;

/* Função para validar email sugerida pelo aluno Michael Caxias no Slack da turma */

const fs = require('fs');

function tokenValidate(req, res) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
}

function nameValidate(res, name) {
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function ageValidate(res, age) {
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
}

function dateValidate(res, date) {
  const RegExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
  if (!RegExpData.test(date)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function rateValidate(res, rate) {
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function talkerValidate(req, res) {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
}

function editTalker(req, res) {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  tokenValidate(req, res);
  nameValidate(res, name);
  ageValidate(res, age);
  talkerValidate(req, res);
  rateValidate(res, talk.rate);
  dateValidate(res, talk.watchedAt);

  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const filteredTalkers = data.filter((element) => element.id !== Number(id));
  const newTalker = { id: Number(id), ...req.body };

  filteredTalkers.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(filteredTalkers));

  return res.status(200).json(newTalker);
}

module.exports = editTalker;

/* Correção para validar rate existente e menor que 1 ao mesmo tempo:
https://github.com/tryber/sd-014-b-project-talker-manager/pull/29 */

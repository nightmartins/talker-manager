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
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
}

function createTalker(req, res) {
  const { name, age, talk } = req.body;

  tokenValidate(req, res);
  nameValidate(res, name);
  ageValidate(res, age);
  talkerValidate(req, res);
  dateValidate(res, talk.watchedAt);
  rateValidate(res, talk.rate);

  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const newTalker = { id: data.length + 1, ...req.body };
  data.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(data));

  return res.status(201).json(newTalker);
}

module.exports = createTalker;

/* Função para validar data sugerida pelo aluno Gustavo Sant'Anna no Slack da turma */
/* Referências para o requisito 4:
https://github.com/tryber/sd-014-b-project-talker-manager/pull/50
https://github.com/tryber/sd-014-b-project-talker-manager/pull/29/
https://github.com/tryber/sd-014-b-project-talker-manager/pull/42/ */

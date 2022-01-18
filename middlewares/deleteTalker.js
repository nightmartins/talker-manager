const fs = require('fs');

function tokenValidate(req, res) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
}

function deleteTalker(req, res) {
  tokenValidate(req, res);

  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const talkerToDelete = data.find((talker) => talker.id === Number(id));
  const talkerIndex = talkerToDelete - 1;
  const newList = data.splice(talkerIndex, 1);

  fs.writeFileSync('./talker.json', JSON.stringify(newList));
  return res.status(204).end();
}

module.exports = deleteTalker;

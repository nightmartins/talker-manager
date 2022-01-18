const fs = require('fs');

function getTalkerById(req, res) {
  const data = fs.readFileSync('talker.json', 'utf8');
  const { id } = req.params;
  const talkerById = JSON.parse(data).find((talker) => talker.id === Number(id));

  if (!talkerById) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerById);
}

module.exports = getTalkerById;

/* Usar o Number para procurar pelo id:
https://github.com/tryber/sd-014-b-project-talker-manager/pull/29/ */

const fs = require('fs');

function getTalker(_req, res) {
  const data = fs.readFileSync('talker.json', 'utf8');
    if (!data) return res.status(200).json([]);
    res.status(200).json(JSON.parse(data));
}

module.exports = getTalker;
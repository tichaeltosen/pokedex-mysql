const db = require('./db/index.js');

const controller = {
  get: (req, res) => {
    const queryString = `select pokemon.name, types.type, images.img from pokemon inner join types on pokemon.typeNum = types.id inner join images on pokemon.imageNum = images.id`

    db.query(queryString, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    })
  }
}

module.exports = controller;
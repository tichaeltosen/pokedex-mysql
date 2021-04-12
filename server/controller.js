const db = require('./db/index.js');

const controller = {
  get: (req, res) => {
    const queryString = `select pokemon.name, pokemon.id, types.type, images.img from pokemon inner join types on pokemon.typeNum = types.id inner join images on pokemon.imageNum = images.id`

    db.query(queryString, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    })
  },

  put: (req, res) => {
    const queryString = `update pokemon set name = "${req.body.name}" where id = ${req.params.id}`

    db.query(queryString, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    })
  },

  delete: (req, res) => {
    const queryString = `delete from pokemon where id = ${req.params.id}`

    db.query(queryString, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    })
  },

  post: (req, res) => {
    console.log(req.body);
    res.status(200).send('posted');
  }
}

module.exports = controller;
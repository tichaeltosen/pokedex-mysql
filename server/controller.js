const db = require('./db/index.js');
const Promise = require('bluebird');
const queryAsync = Promise.promisify(db.query).bind(db);

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

    // insert image, then type and store their result id numbers
    //then insert a poke with the typeNum and imageNum from the results
    let imgId, typeId;
    let {name, type, img} = req.body;

    queryAsync(`insert into images (img) values ("${img}")`)
      .then(result => {
        imgId = result.insertId;
        return queryAsync(`insert into types (type) values  ("${type}")`)
      }).then(result => {
        typeId = result.insertId;
        return queryAsync(`insert into pokemon (name, typeNum, imageNum) values ("${name}", "${typeId}", "${imgId}" )`)
      }).then(result => {
        res.status(200).send(result);
      })
  }
}

module.exports = controller;
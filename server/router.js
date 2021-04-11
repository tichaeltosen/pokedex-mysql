const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/pokemon')
  .get(controller.get)


  module.exports = router;
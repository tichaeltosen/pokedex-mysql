const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/pokemon')
  .get(controller.get)

router
  .route('/pokemon/:id')
  .put(controller.put)
  .delete(controller.delete)


  module.exports = router;
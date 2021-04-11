const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const PORT = 3000;
const router = require('./router.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('client/dist'));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
/* eslint-disable no-undef */
const express = require('express');
const router = require('./routes');
const app = express();

require('dotenv').config();

const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

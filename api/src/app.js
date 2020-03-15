const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
//const debtRoutes = require('./routes/debtRoutes');

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', authRoutes);

module.exports = app;
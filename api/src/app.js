const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const { authorization } = require('../src/services/authServices');
const employeeRoutes = require('./routes/employeeRoutes');

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/employee', authorization, employeeRoutes);

module.exports = app;
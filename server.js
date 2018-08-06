#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// configure the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connect to mongoose
const options = {
  authSource: "admin",
  useNewUrlParser: true
};
mongoose.connect(dbConfig.url, options)
  .then(() => {
    console.log('Successfully connected to mongodb.');
  })
  .catch(err => {
    console.log('Could not connect to mongodb. Exiting now...');
    console.log(err);
    process.exit();
  });

// define a simple route
app.get('/', (req, res) => {
  res.json(
    {"message": "Welcome to EasyNotes app"}
  );
});

// add routes to the app
require('./app/routes/note.routes')(app);

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});


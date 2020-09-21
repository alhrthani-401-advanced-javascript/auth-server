'use strict';

const server = require('./lib/server');
const mongoose = require('mongoose');
require('dotenv');
const db_url = process.env.db_url;
let port = process.env.port;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(db_url, mongooseOptions);

server.start(port);
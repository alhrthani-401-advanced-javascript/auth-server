const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'] },
});

schema.plugin(uniqueValidator);

schema.pre('save', async function(next) {
  console.log('hash password called');
  this.password = await bcrypt.hash(this.password, 5);
  next();
});

schema.methods.authenticateUser = async function() {
  const { username, password } = this;
  const user = await this.constructor.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return { isValid, user };
};

schema.methods.generateToken = async function() {
  // const { username } = this;
  const username = this.username;

  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
  return token;
};

schema.methods.authenticateToken = async function(token) {
  try {
    let tokenObject = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('tokenObject -----> ', tokenObject);
    const userNameFromObject = tokenObject.username;
    console.log({ userNameFromObject });
    const username = await this.constructor.findOne({ username: userNameFromObject });
    console.log({ username });
    if (username) {
      return Promise.resolve({
        tokenObject: tokenObject,
        user: username,
      });
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject();
  }
};











module.exports = mongoose.model('users', schema); // collection 


// 'use strict';

// // create a schema for my food
// // I will use mongoose.Schema()

// const mongoose = require('mongoose');

// // it will be like one object that has objects, 
// //each one of these objects will have properties:
// // for example: type, required

// const user = mongoose.Schema({
//     username: { type: String, required: true },
//     password: { type: Number, required: true },
//     role: { type: String, enum: ['admin', 'user', 'writer'] }
// });

// // create a model and expose it 
// module.exports = mongoose.model('user', user);
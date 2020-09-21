// 'use strict';

// const express = require('express');
// const router = express.Router();
// const user = require('./models/users_collection.js');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = 'mytokensecret';
// router.get('/users', handleGetUsers);
// router.post('/signup', handleSignup);
// router.post('/signin', handleSignin);
// router.put('/:model/:id', handlePutItem);
// router.delete('/:model/:id', handleDeleteItem);
// router.param('model', getModel);
// How will we get the right Model? 

// function getModel(req, res, next) {
//     let model = req.params.model;
//     switch (model) {
//         case 'users':
//             req.model = user;
//             next();
//             break;
//         default:
//             next('Invalid Model!!! ');
//             break;
//     }
// }

// function handleSignin(req, res, next) {
//     console.log('req.head: ', req.head);
// req.model.get().then(results => {
//     let count = results.length;
//     res.json({ count, results });
// });
// }

// async function handleSignup(req, res, next) {
//     let record = req.body;
//     console.log({ record });
//     let getResult = await user.get(record.username);
//     console.log({ getResult });
//     if (getResult.length == 0) {
//         console.log('No user in DB. Creating new user');
//         console.log('password before hash: ', record.password);
//         record.password = await bcrypt.hash(record.password, 5);
//         console.log('password after hash: ', record.password);
//         try {
//             user.create(record);
//         } catch (error) {
//             console.log('erroe in creating record>>>', error);
//         }
//     }
// }

// async function handleGetUsers(req, res, next) {
//     console.log('handleGetUsers called');
//     try {
//         return await user.getAll()
//     } catch (error) {
//         console.log('erroe in geting record getAll() >>>', error);
//     }
// }

// generateToken = function(user) {
//     //jwt to genrate a token for us.
//     // install jwt and generate a token with it and return it.
//     let token = jwt.sign({ username: user.username }, SECRET);
//     return token;
// };

// module.exports = router;

const express = require('express');

const router = express.Router();

const basicAuth = require('./middleware/basic');

const UserSchema = require('./models/users-model');



router.get('/users', handleGetUsers);
router.post('/signup', handleSignup);
router.post('/signin', basicAuth, handleSignin);

async function handleGetUsers(req, res) {
  const data = await UserSchema.find({});
  res.status(200).send({ data });
}

async function handleSignup(req, res) {
  const newUser = new UserSchema(req.body);
  const data = await newUser.save();
  res.status(200).send({ data });
}

async function handleSignin(req, res) {
  const { user, isValid } = req;
  if (isValid) {
    const authUser = new UserSchema({ username: user.username });
    const token = await authUser.generateToken();
    res.status(200).send({ user, token });
  } else {
    res.status(401).send({ msg: 'username/password is incorrect' });
  }
}

module.exports = router;
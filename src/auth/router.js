const express = require('express');

const router = express.Router();

const basicAuth = require('./middleware/basic');

const UserSchema = require('./models/users-model');

const oauth = require('./middleware/oauth.js');
const bearerAuth = require('./middleware/bearer.js');



router.get('/users', bearerAuth, async(req, res) => {
  const data = await UserSchema.find({});
  res.status(200).send({ data });
});

router.get('/adminusers', async(req, res) => {
  const data = await UserSchema.find({});
  res.status(200).send({ data });
});

router.post('/signup', async(req, res) => {
  console.log('singup called');
  console.log('req.body>>>>', req.body);
  const newUser = new UserSchema(req.body);
  const data = await newUser.save();
  console.log('new user has been added, Details:', data);
  res.status(200).send({ data });
});


router.get('/oauth', oauth, (req, res) => {
  console.log('req.query.code>>>>', req.query.code);
  console.log('req.user>>>>', req.user);
  console.log('req.token>>>>', req.token);

  res.status(200).send(req.token);
});



router.post('/signin', basicAuth, async(req, res) => {
  const { user, isValid } = req;
  console.log({ user });
  console.log({ isValid });

  if (isValid) {
    console.log('inside is valid');

    const authUser = new UserSchema({ username: user.username });
    const token = await authUser.generateToken();
    res.status(200).send({ user, token });
  } else {
    console.log('inside else of is valid');

    res.status(401).send({ msg: 'username/password is incorrect' });
  }
});

module.exports = router;
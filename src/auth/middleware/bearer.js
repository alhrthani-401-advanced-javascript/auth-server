// const base64 = require('base-64');
const UserSchema = require('../models/users-model');

// check on the token, does it exist?
// if yes then parse it and get user and validate him
// check if I have in my request header, an Authorization key
// header key Authorization 
// value of it {Bearer token}
module.exports = (req, res, next) => {
  console.log('bearer called');
  if (!req.headers.authorization) {
    console.log('Invalid Login, No Headers !!');

    return next('Invalid Login, No Headers !!');
  }
  console.log('req.headers.authoriation : ', req.headers.authorization);
  let bearer = req.headers.authorization.split(' ');

  if (bearer[0] == 'Bearer') {
    console.log('Bearer found');

    const token = bearer[1];
    console.log({ token });

    // authenticate this token and get the valid user
    let x = new UserSchema();
    x.authenticateToken(token).then(validUser => {
      console.log('validUser ---> ', validUser);
      req.user = validUser;
      next();
    }).catch(err => next('Invalid Token!'));

  } else {
    return next('Invalid Bearer!!');
  }
};
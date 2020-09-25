'use strict';

const superagent = require('superagent');
const UserSchema = require('../models/users-model');

// const users = require('./users.js');

/*
  Resources
  https://developer.github.com/apps/building-oauth-apps/
*/



module.exports = async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('(2) ACCESS TOKEN:', remoteToken);

    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('(3) GITHUB USER', remoteUser);

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    console.log('(4) LOCAL USER', user);

    next();
  } catch (e) { next(`ERROR: ${e.message}`); }

};

async function exchangeCodeForToken(code) {
  console.log('exchangeCodeForToken called');
  const tokenServerUrl = process.env.TOKEN_SERVER;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const API_SERVER = process.env.API_SERVER;

  console.log({ tokenServerUrl });



  let tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });

  console.log({ tokenResponse });


  let access_token = tokenResponse.body.access_token;
  console.log({ access_token });


  return access_token;

}

async function getRemoteUserInfo(token) {
  const remoteAPI = process.env.REMOTE_API;

  console.log('getRemoteUserInfo called');


  let userResponse =
        await superagent.get(remoteAPI)
          .set('user-agent', 'express-app')
          .set('Authorization', `token ${token}`);

  let user = userResponse.body;

  return user;

}

async function getUser(remoteUser) {
  console.log('getUser called');
  console.log({ remoteUser });



  let userRecord = {
    username: remoteUser.login,
    password: 'oauthpassword',
    role: 'user',
  };

  console.log({ userRecord });

  const newUserObject = new UserSchema(userRecord);
  const user = await newUserObject.save();
  const token = await newUserObject.generateToken();

  // let token = UserSchema.generateToken(user);

  console.log({ user });
  console.log({ token });

  return [user, token];

}
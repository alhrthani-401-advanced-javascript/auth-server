const mongoose = require('mongoose');

const serverModule = require('./src/server');

require('dotenv').config();

const mongoURL = process.env.MONGOOSE_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

serverModule.start();


// 'use strict';

// // connect my application to my local mongoDB using mongoose
// const mongoose = require('mongoose');
// const User = require('./models/user.js');

// // this should be in your .env file 
// const MONGOOSE_URL = 'mongodb://localhost:27017/users';

// mongoose.connect(MONGOOSE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });


// let userData = {
//     username: 'Ahmad',
//     password: 12345,
//     role: 'admin'
// };

// let user = new User(userData);


// user.save().then(returnedData => {
//     console.log({ returnedData });
// })

// User.find({}).then(allUsers => {
//     console.log({ allUsers });

// });

// // User.deleteMany({}).then(deleteResult => {
// //     console.log({ deleteResult });

// // });





// // const foodOperations = async() => {

// //     let carrot = {
// //         username: 'Ahmad',
// //         password: 12345,
// //         role: 'admin'
// //     };

// //     // Create 
// //     let food = new User(carrot);
// //     let foodItem = await food.save();
// //     console.log("food Created :::::> ", foodItem);

// //     let oneItem = await User.findById("5f573c577f1ae54dc4bcfc52");
// //     console.log(" findById >>>> ", oneItem);

// // let allFoodItems = await User.save();
// //     console.log("------------------------------")
// //     console.log("allFoodItems : ", allFoodItems)


// // }
// // foodOperations();
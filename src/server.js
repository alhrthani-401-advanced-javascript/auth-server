// 'use strict';

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const morgan = require('morgan');
// const router = require('./auth/router.js');
// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));


// // const logger = require('./middleware/logger.js');
// // const timeStamp = require('./middleware/timeStamp.js');
// const handle404 = require('./middleware/404.js');
// const handle500 = require('./middleware/500.js');
// const readystate = require('./middleware/readystate.js');


// require('dotenv').config();

// // Global MiddleWare : app.use on the level of my application
// app.use(express.json());


// // app.all("*", readystate);
// // app.use(readystate);
// // app.use(logger);

// //app.use('/api/v1', categoryRoutes);
// app.use('/', router);
// //app.use('/api/v1', productRoutes);
// // app.use('/', productRoutes);

// app.use(handle404);
// app.use(handle500);

// module.exports = {
//     server: app,
//     start: PORT => {
//         PORT = process.env.PORT || 8080;
//         app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//     },
// };



const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./auth/router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.all('/', (req, res) => {
  res.status(200).send({ msg: 'Hello World!' });
});

app.use('/', authRouter);

// page not found middleware
app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Sorry, page not found !' });
});

// error middleware
app.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).send({ msg: err.message });
});

const PORT = process.env.PORT || 3000;

module.exports = {
  server: app,
  start: () => {
    app.listen(PORT, () => {
      console.log(`server started - ${PORT}`);
    });
  },
};
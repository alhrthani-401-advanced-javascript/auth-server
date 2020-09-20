'use strict';
const express = require('express');
const app = express();
require('dotenv').config();


module.exports = {
    server: app,
    start: port => {
        let PORT = port || 8000;
        app.listen(PORT, () => {
            console.log('app is listening to ', PORT);
        })
    }

}
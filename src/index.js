const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log('Listening on localhost 3333')
});
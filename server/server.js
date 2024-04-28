require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const routes = require('./routes/index.js');

const runServer = async () => {
    await mongoose
        .connect('mongodb://127.0.0.1/taskmanager')
        .then(() => console.log('Database Connected!'))
        .catch((e) => console.log('Failed to connect DB'));

    app.use('/api', routes);

    app.listen(process.env.PORT, () => {
        console.log('listening on port ' + process.env.PORT);
    });
};

runServer();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config();
const db = process.env.DB_CONNECT;

mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err) {
        console.error("Error! " + err);
    } else {
        console.log("Connected to db");
    }
});

const port = 3000;
app.use(express.static(path.join(__dirname, 'dist/Property-Listing')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const listapi = require('./server/routes/listingapi');
app.use('/api/listings', listapi);

const userapi = require('./server/routes/userapi');
app.use('/api/users', userapi);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Property-Listing/index.html'));
})

app.listen(port, function () {
    console.log("Server running on local host: " + port);
})
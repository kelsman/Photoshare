const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const Pusher = require("pusher");

module.exports = pusher = new Pusher({
    appId: process.env.Pusher_app_id,
    key: process.env.Pusher_key,
    secret: process.env.Pusher_secret,
    cluster: process.env.Pusher_cluster,
    useTls: true
});
// const config = require('config');
// const mongoUrl = config.get("MongoUrl");
//initialise express app

const app = express();
//middlewares
app.use(express.json());
app.use(cors());


//port
const PORT = process.env.PORT || 8000;

//database config 
const db = process.env.mongoUrl;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (err) {
        console.log('error connecting to databse')
    }
    else {
        console.log('db connected');
    }
});

//defined routes
app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/post', require('./api/routes/post'));

app.listen(PORT, () => console.log(`running on PORT ${PORT}`));




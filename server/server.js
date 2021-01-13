const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");


let pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    usetls: true
})
// const config = require('config');
// const mongoUrl = config.get("MongoUrl");
require('dotenv').config();
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
        app.listen(PORT, () => console.log(`running on PORT ${PORT}`))

    }
});


//defined routes
app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/post', require('./api/routes/post'));


//pusher config

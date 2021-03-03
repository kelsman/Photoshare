require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const connectDb = require('./db');

const app = express();
const Port = process.env.Port || 9000

// app configuration
app.set('port', Port);


//load app middlewares
app.use(cors());
if (app.get('env') === "development") {
    app.use(morgan('dev'));
}
// data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// connect to mongodb 
connectDb();


//load Api routes
// app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/post', require('./api/routes/post'));
//establish http server connections

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/build')))
}
app.listen(Port, () => {
    return console.log(`server running on port ${Port}`);
});
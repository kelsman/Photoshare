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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// connect to mongodb 
connectDb();


//load Api routes
// app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/user', require('./api/routes/user'));

//establish http server connections
app.listen(Port, () => {
    return console.log(`server running on port ${Port}`);
});
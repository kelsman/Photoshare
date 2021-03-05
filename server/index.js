require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const connectDb = require('./db');
const app = express();

const socketIo = require('socket.io');

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

const server = app.listen(Port, () => {
    return console.log(`server running on port ${Port}`);
});

const io = socketIo(server);
app.set('sockeIo', io);
const Mnsp = io.of('/message_space');

Mnsp.on('connection', (socket) => {
    console.log('socket conneted')
    socket.emit('welcome', 'oh hi there')
    socket.on('disconnect', () => console.log('socket disconnected'));
})
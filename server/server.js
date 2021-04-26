require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
var bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./db');
const app = express();
const socket = require('socket.io');
const path = require('path')
// const userRouter = require('./api/routes/user');
// const postRouter = require('./api/routes/post');

const PORT = process.env.PORT || 9000

// app configuration

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'));
}


//@ connect to mongodb 
connectDb();

//establish http server connections

const server = app.listen(PORT, (err) => {
    if (err) throw err
    return console.log(`server running on port ${PORT}`);
});

//@load Api routes
// app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/post', require('./api/routes/post'));
app.use('/api/route/profile', require('./api/routes/profile'));
app.use('/api/route/story', require('./api/routes/stories'));


app.get('/', (req, res) => {

    res.json({
        msg: "Hello there, photoshare is working"
    })
})


const io = socket(server);
app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('made socket connection');

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    })
    return socket
})



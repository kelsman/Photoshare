require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
var bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./db');
const app = express();
const socket = require('socket.io');
const path = require('path')
const Port = process.env.Port || 9000

// app configuration
app.set('port', Port);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

if (process.env.NODE_ENV !== "production") {
    app.use(morgan('tiny'));

}
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

//@ connect to mongodb 
connectDb();

//establish http server connections

const server = app.listen(Port, (err) => {
    if (err) throw err
    return console.log(`server running on port ${Port}`);
});

//@load Api routes
// app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/user', require('./api/routes/user'));
app.use('/api/route/post', require('./api/routes/post'));



const io = socket(server);
app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('made socket connection');

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    })
    return socket
})




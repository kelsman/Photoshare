require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
var bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./db');
const app = express();
const jwt = require('jsonwebtoken')
const socket = require('socket.io');

const Port = process.env.Port || 9000

// app configuration
app.set('port', Port);


//load app middlewares
app.use(cors());
if (app.get('env') === "development") {
    app.use(morgan('dev'));
}
// data parsing
//  parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



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

const io = socket(server);
app.set('socketio', io);
// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     try {

//         if (token) {
//             const user = jwt.decode(token, process.env.JwtSecret)
//             if (!user) {
//                 return next(new Error('not authorised'))
//             }
//             socket.user = user;
//             return next()
//         }
//     } catch (error) {
//         next(error)
//     }
// });
io.on('connection', (socket) => {
    console.log('made socket connection');

    socket.on('disconnect', () => {
        console.log('socket disconnected');
    })
    return socket
})




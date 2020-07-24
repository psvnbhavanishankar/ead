const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./routes/api/chat_users');
const { json } = require('express');

const app = express();

// Regarding Chat

const server = http.createServer(app);
const io = socketio(server);

// Init Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json({ extended: false }));

// const bodyParser = require('body-parser');
// const { resolve } = require('path');
// const cloudinary = require('cloudinary');

// cloudinary.config({
//   cloud_name: 'saltandpeppercloud',
//   api_key: '291595787748935',
//   api_secret: 'P8nXfLmLbJuhdTljN9MmY0lNLLs'
// });

// var multer = require('multer');
// const cloudinaryStorage = require('multer-storage-cloudinary');
// var parser = multer({
//   storage: cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: 'uploads',
//     filename: function(req, file, cb) {
//       cb(undefined, file.originalname);
//     }
//   })
// });

//connect MongoDB
connectDB();

app.get('/', (req, res) => res.send('API running'));

let history = '';
//io
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    if (history) {
      socket.emit('message', {
        user: 'admin',
        text: history,
      });
    }

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { user: user.name, text: message });
    history = message;
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      });
    }
    // io.to(user.room).emit('roomData', {
    //   room: user.room,
    //   users: getUsersInRoom(user.room),
    // });
  });
  console.log('User had left!!');
});

//Middleware for access to req.body

// app.use(express.static(resolve(__dirname, '/public')));

// app
//   .use(express.json({ extend: false }))
//   .use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/users', require('./routes/api/users'));

app.use('/api/chat', require('./routes/api/chat'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/profile_lawyer', require('./routes/api/profile_lawyer'));

// app.use('/api/recipes', require('./routes/api/recipes'));

app.use('/api/cases', require('./routes/api/cases'));

app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/blogs', require('./routes/api/blogs'));

app.use('/api/comments', require('./routes/api/comments'));

app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/auth_lawyer', require('./routes/api/auth_lawyer'));

app.use('/api/fields', require('./routes/api/fields'));

// app.use('/api/ingredients', require('./routes/api/ingredients'));

// app.use('/api/cuisine', require('./routes/api/cuisine'));

// app.use('/api/warehouse', require('./routes/api/warehouse'));

// app.post('/uploadImages', parser.array('image'), (req, res, next) => {
//   // req.files will show you the uploaded files
//   // and req.body will show you the rest of your form data
//   console.log(req.files[0].url);
//   res.json({ msg: 'done' });
//   // var CryptoJS = require('crypto-js'); //replace thie with script tag in browser env

//   // //encrypt
//   // var rawStr = req.files[0].url;
//   // var wordArray = CryptoJS.enc.Utf8.parse(rawStr);
//   // var base64 = CryptoJS.enc.Base64.stringify(wordArray);
//   // console.log('encrypted:', base64);

//   // //decrypt
//   // var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
//   // console.log(parsedWordArray);
//   // var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
//   // console.log('parsed:', parsedStr);
// });

const PORT = process.env.PORT || 5000; //heroku runs star script in package.json file. The PORT variable in env is also for heroku

server.listen(PORT, () => console.log(`server started at ${PORT}`));

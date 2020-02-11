const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const router = require('./router');

// Models
const User = require('./models/User');

// API urls
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./controllers/users');
const { addMessage, getMessages } = require('./controllers/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.use(cors());

// Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/users', users);
app.use('/api/chat', messages);

// Establish socket connection
io.on('connect', (socket) => {
	socket.on('join', async ({ name, room }, cb) => {
		socket.emit('message', { user: 'admin', text: `${name}, welcome to chat` });
		socket.broadcast.to(room).emit('message', { user: 'admin', text: `${name} has joined!` });

		socket.join(room);

		//io.to(room).emit('roomData', { room: user.room, users: getUsersInRoom(room) });

		cb();
	});

	socket.on('sendMessage', (name, room, message, cb) => {
		// const user = getUser(socket.id);

		io.to(room).emit('message', { creator: name, text: message });

		addMessage(name, room, message).then().catch((error) => console.log(error));

		//io.to(room).emit('roomData', { room: room, messages: getMessages(room) });

		cb();
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!` });
		}
	});
});

// Static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

mongoose
	.connect('mongodb+srv://admin:admin99899@cluster0-cyi2d.mongodb.net/db?retryWrites=true&w=majority')
	.then(() => {
		server.listen(PORT, () => {
			console.log('Server running on port ' + PORT);
		});
	})
	.catch((error) => {
		console.log(error);
	});

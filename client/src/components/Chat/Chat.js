import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import axios from 'axios';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({ location, setToken }) => {
	const [ name, setName ] = React.useState('');
	const [ room, setRoom ] = React.useState('');
	const [ users, setUsers ] = React.useState('');
	const [ message, setMessage ] = React.useState('');
	const [ messages, setMessages ] = React.useState([]);
	const API_URL = 'localhost:5000';

	React.useEffect(
		() => {
			const { name, room } = queryString.parse(location.search);

			socket = io(API_URL);

			setName(name);
			setRoom(room);

			socket.emit('join', { name, room }, () => {});

			axios
				.get(`/api/chat/messages/${room}`)
				.then((res) => {
					setMessages(res.data);
				})
				.catch((error) => {
					console.log(error);
				});

			return () => {
				socket.emit('disconnect');
				socket.disconnect();
			};
		},
		[ API_URL, location.search ]
	);

	React.useEffect(
		() => {
			socket.on('message', (message) => {
				setMessages([ ...messages, message ]);
			});

			// socket.on('roomData', (msgs) => {
			// 	console.log(msgs);
			// 	// 	setMessages(messages);
			// });
		},
		[ messages ]
	);

	const sendMessage = (e) => {
		e.preventDefault();

		if (message) {
			socket.emit('sendMessage', name, room, message, () => {
				setMessage('');
			});
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken();
	};

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} logout={logout} />
				{messages && <Messages messages={messages} name={name} />}
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
				{/* <TextContainer users={users} /> */}
			</div>
		</div>
	);
};

export default withRouter(Chat);

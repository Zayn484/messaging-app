import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import axios from 'axios';

import './Chat.css';

import InfoBar from '../../components/InfoBar/InfoBar';
import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import TextContainer from '../../components/TextContainer/TextContainer';
import Sidebar from '../../components/Sidebar/Sidebar';

let socket;

const API_ENDPOINT = 'https://snu-web-random-chat.herokuapp.com';

const Chat = ({ location, token, setToken }) => {
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
				.get(`/api/chat/messages/${room}`, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				})
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
			setMessage('');
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		setToken(false);
	};

	return (
		<div className="outerContainer">
			<div className="innerContainer">
				<InfoBar
					room={room}
					name={name}
					token={token}
					handleInput={(e) => setName(e.target.value)}
					handleLogout={logout}
				/>
				<div style={{ display: 'flex', height: '90%' }}>
					<Sidebar />
					<div
						style={{
							display: 'flex',
							flex: 1,
							flexDirection: 'column',
							width: '75%',
							justifyContent: 'flex-end',
							position: 'relative'
						}}
					>
						{messages && <Messages messages={messages} name={name} />}
						{token && <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />}
						{/* <TextContainer users={users} /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Chat);

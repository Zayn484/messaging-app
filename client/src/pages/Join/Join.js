import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Join.css';

const Join = ({ history, setToken }) => {
	const [ join, setMode ] = React.useState(true);
	const [ name, setName ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const [ room, setRoom ] = React.useState('open-chat-room');
	const [ error, setError ] = React.useState('');

	React.useEffect(() => {
		if (localStorage.getItem('token')) {
			setToken();
			const name = localStorage.getItem('name');
			history.push(`/chat?name=${name}&room=${room}`);
		}
	}, []);

	const joinHandler = () => {
		// (e) => (!name || !room ? e.preventDefault() : null)

		axios
			.post('/api/users/join', { name, password, room })
			.then((res) => {
				setError(false);
				setMode(true);
			})
			.catch((err) => {
				setError(err.response && err.response.data.name);
			});
	};

	const loginHandler = () => {
		setError(false);

		axios
			.post('/api/users/login', { name, password, room })
			.then((res) => {
				setError(false);
				redirect(res);
			})
			.catch((err) => {
				setError(err.response && err.response.data.message);
			});
	};

	const redirect = (res) => {
		localStorage.setItem('token', res.data.token);
		localStorage.setItem('name', res.data.name);
		setToken();
		history.replace(`/chat?name=${name}&room=${room}`);
	};

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Get Started</h1>
				<div>
					{error && (
						<div className="error">
							<small>{error}</small>
						</div>
					)}
					<input
						placeholder="Username"
						className="joinInput mt-20"
						type="text"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						placeholder="Password"
						className="joinInput mt-20"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				{!join ? (
					<button className="button mt-20" type="submit" onClick={joinHandler}>
						Join
					</button>
				) : (
					<button className="button mt-20" type="submit" onClick={loginHandler}>
						Log In
					</button>
				)}
				<div className="mt-20" onClick={() => setMode(!join)}>
					<strong className="option">{join ? 'Create Account' : 'Login'} </strong>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Join);

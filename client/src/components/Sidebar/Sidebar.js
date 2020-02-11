import React from 'react';
import axios, { token, name } from '../../config';

import './Sidebar.css';

export default function Sidebar() {
	const [ users, setUsers ] = React.useState([]);
	const [ search, setSearch ] = React.useState('');

	React.useEffect(() => {
		axios
			.get(`/users/${name}`, {
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const filteredUsers = users.filter((user) => user.name.includes(search.toLowerCase()));

	return (
		<aside className="sidebar">
			<div className="sidebar-head">
				<input placeholder="Search contacts" value={search} onChange={(e) => setSearch(e.target.value)} />
				<div className="sidebar-head__options">
					<label>Add a new group</label>
					<label>Send Broadcast</label>
				</div>
			</div>

			<div className="sidebar-contacts">
				{filteredUsers.map((user) => (
					<div key={user._id} className="contact">
						{user.name}
					</div>
				))}
			</div>
		</aside>
	);
}

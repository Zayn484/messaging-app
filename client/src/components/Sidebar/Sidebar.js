import React from 'react';

import './Sidebar.css';

export default function Sidebar() {
	return (
		<aside className="sidebar">
			<div className="sidebar-head">
				<input placeholder="Search contacts" />
				<div className="sidebar-head__options">
					<label>Add a new group</label>
					<label>Send Broadcast</label>
				</div>
			</div>

			<div className="sidebar-contacts">
				<div className="contact">Contact 1</div>
				<div className="contact">Contact 1</div>
				<div className="contact">Contact 1</div>
			</div>
		</aside>
	);
}

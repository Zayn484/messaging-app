import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import logoutIcon from '../../icons/logoutIcon.png';

import './InfoBar.css';

export default ({ logout }) => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<img className="onlineIcon" src={onlineIcon} alt="online" />
			<h3>Chat</h3>
		</div>
		<div className="rightInnerContainer">
			<a href="/" onClick={logout}>
				<img className="closeIcon" width={25} height={25} src={logoutIcon} alt="logout" />
			</a>
		</div>
	</div>
);

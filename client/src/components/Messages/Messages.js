import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

import './Messages.css';

export default ({ messages, name }) => (
	<ScrollToBottom className="messages">
		{messages.map((msg, index) => (
			<div key={index}>
				<Message message={msg} name={name} />
			</div>
		))}
	</ScrollToBottom>
);

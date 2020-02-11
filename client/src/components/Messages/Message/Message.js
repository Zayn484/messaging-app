import React from 'react';
import dayjs from 'dayjs';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { _id, text, userName, createdAt }, name }) => {
	const user = userName;
	let isSentByCurrentUser = false;
	console.log(text);
	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div className="messageContainer justifyEnd">
			<p className="sentText pr-10">{trimmedName}</p>
			<div
				className="messageBox backgroundBlue"
				data-toggle="tooltip"
				data-placement="top"
				title={dayjs(createdAt).format('YYYY-MM-DD')}
			>
				<p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	) : (
		<div className="messageContainer justifyStart">
			<div
				className="messageBox backgroundLight"
				data-toggle="tooltip"
				data-placement="top"
				title={dayjs(createdAt).format('YYYY-MM-DD')}
			>
				<p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
			</div>
			<p className="sentText pl-10 ">{userName}</p>
		</div>
	);
};

export default Message;

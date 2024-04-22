import { useEffect, useState } from 'react';

import Message from '../features/messages/components/Message.jsx';
import MessageForm from '../features/messages/components/MessageForm.jsx';
import { apiGetMessages } from '../features/messages/services/messageApi.js';

export default function MessageBoard() {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		async function getMessages() {
			const messages = await apiGetMessages();
			setMessages(() => messages);
		}

		window.addEventListener('click', (e) => {
			if (e.target.closest('div').className === 'message-form-sendIcon')
				getMessages();
		});
		getMessages();
	}, []);
	return (
		<div className='message-board'>
			<div className='message-board-header'></div>
			<div className='message-board-messages-container'>
				{messages.length > 0 &&
					messages.map((message) => (
						<Message
							key={message._id}
							username={message.username}
							avatarID={message.avatarID}
							date={message.date}
							message={message.content}
						/>
					))}
			</div>
			<MessageForm />
		</div>
	);
}

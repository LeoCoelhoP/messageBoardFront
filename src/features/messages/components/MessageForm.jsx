import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';

import { BsEmojiSmile } from 'react-icons/bs';
import { VscSend } from 'react-icons/vsc';

import { newMessage } from '../services/messageApi';
import { UserContext } from '../../../context/UserContext';
import { MESSAGE_PLACEHOLDER } from '../../../data/UIMessages/ChatPage';

export default function MessageForm() {
	const [isShowingEmoji, setIsShowingEmoji] = useState(false);
	const [message, setMessage] = useState('');
	const { user } = useContext(UserContext);

	useEffect(() => {
		const handleClick = window.addEventListener('click', (e) => {
			console.log(e.target.className);
			// if (e.target.className === 'message-form-emoji') {
			// 	setIsShowingEmoji((state) => !state);
			// 	return;
			// }
			const parent = e.target.closest('div');
			if (
				parent.className !== 'message-form-emoji' &&
				parent.className.length < 33
			)
				setIsShowingEmoji(false);
		});

		return () => window.removeEventListener('click', handleClick);
	}, []);

	function handleOnMessageChange(e) {
		setMessage(e.target.value);
	}
	function handleAddEmoji(emoji) {
		setMessage((state) => state + emoji.emoji);
	}

	function handleShowEmoji() {
		setIsShowingEmoji((state) => !state);
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!message || message === ' ') {
			toast.error('Please, type a message.');
			return;
		}
		newMessage(message, user.username, user.avatarID);
		setMessage('');
	}

	return (
		<>
			<div className='message-form'>
				<div className='message-form-emoji'>
					<BsEmojiSmile onClick={handleShowEmoji} />
					<div className='message-form-emoji-picker-container'>
						{isShowingEmoji && (
							<EmojiPicker
								width={300}
								height={400}
								skinTonesDisabled={true}
								lazyLoadEmojis={true}
								emojiStyle={'apple'}
								autoFocusSearch
								onEmojiClick={(emoji) => handleAddEmoji(emoji)}
								previewConfig={{ showPreview: false }}
							/>
						)}
					</div>
				</div>
				<form name='form'>
					<textarea
						className='message-form-user-message'
						placeholder={MESSAGE_PLACEHOLDER}
						value={message}
						onChange={(e) => handleOnMessageChange(e)}></textarea>
				</form>
				<div className='message-form-sendIcon'>
					<VscSend onClick={handleSubmit} />
				</div>
			</div>
		</>
	);
}

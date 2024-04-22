import PropTypes from 'prop-types';

import dateFormatter from '../../../utils/dateFormatter';

export default function Message({ avatarID, username, date, message }) {
	const formattedDate = dateFormatter(date);
	return (
		<div className='users-message-main-container'>
			<img
				src={`./avatars/avatar${avatarID}.png`}
				alt='avatar'
				className='users-message-avatar'
			/>
			<div>
				<div className='users-message-username'>{`@${username}`}</div>
				<div className='users-message-content'>{message}</div>
				<div className='users-message-date'>{formattedDate}</div>
			</div>
		</div>
	);
}

Message.propTypes = {
	avatarID: PropTypes.string,
	username: PropTypes.string,
	date: PropTypes.string,
	message: PropTypes.string,
};

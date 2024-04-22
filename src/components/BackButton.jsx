import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function BackButton({ children, redirectTo }) {
	return (
		<span className='singup-back-btn'>
			<Link
				style={{ textDecoration: 'none', color: 'black' }}
				to={redirectTo}
				replace>
				{children}
				<IoMdArrowBack />
			</Link>
		</span>
	);
}

BackButton.propTypes = {
	children: PropTypes.element,
	redirectTo: PropTypes.string,
};

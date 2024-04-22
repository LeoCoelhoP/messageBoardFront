import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Redirect({ children, url }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (url) navigate(url, { replace: true });
	}, [url, navigate]);

	return <div>{children || <h1>Page Not Found</h1>}</div>;
}

Redirect.propTypes = {
	children: PropTypes.element,
	url: PropTypes.string,
};

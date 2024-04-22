import PropTypes from 'prop-types';
import BackButton from '../components/BackButton';
import SignUpForm from '../features/SignUp/components/SignUpForm';

SignUp.propTypes = {
	className: PropTypes.string,
};

export default function SignUp({ className }) {
	return (
		<div className={`signup-container ${className}`}>
			<BackButton redirectTo={'/login'}>
				<p>Login</p>
			</BackButton>

			<h1>Sing Up</h1>

			<SignUpForm />
		</div>
	);
}

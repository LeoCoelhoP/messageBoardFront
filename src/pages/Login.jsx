import { Link } from 'react-router-dom';

import LogInForm from '../features/LogIn/components/LogInForm';
import { LOG_IN_FORM } from '../data/UIMessages/LogInPage';

import '../assets/css/login.css';

export default function Login() {
	return (
		<>
			<div className={`login-container`}>
				<h1>{LOG_IN_FORM.title}</h1>

				<LogInForm />

				<p className='login-special-action'>
					{LOG_IN_FORM.noAccount}
					<span className='login-special-action'>
						<Link to='/signup'>{LOG_IN_FORM.signUpButtonLabel}</Link>
					</span>
				</p>
			</div>
		</>
	);
}

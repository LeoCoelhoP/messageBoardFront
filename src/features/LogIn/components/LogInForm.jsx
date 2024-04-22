import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordLine } from 'react-icons/ri';

import { UserContext } from '../../../context/UserContext';
import {
	ERROR_LOG_IN,
	LOG_IN_FORM,
	SUCCESS_LOG_IN,
} from '../../../data/UIMessages/LogInPage';

export default function LogInForm() {
	async function loginUser(e) {
		e.preventDefault();
		const { username, password } = loginData;
		if (!username) {
			toast.error(ERROR_LOG_IN.username);
			return;
		}

		if (!password) {
			toast.error(ERROR_LOG_IN.password);
			return;
		}

		try {
			const { data } = await axios.post('/api/auth/login', {
				username,
				password,
			});
			if (data.error) toast.error(data.error);
			else {
				setLoginData({});
				toast.success(SUCCESS_LOG_IN);
				window.setTimeout(() => {
					navigate('/chat');
				}, 1000);
				setUser(null);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const [loginData, setLoginData] = useState({
		username: '',
		password: '',
	});
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<form className='login-form' onSubmit={loginUser}>
			<label htmlFor='username'>
				<span>
					<CgProfile className='username-icon' />
				</span>
				<span className='username-label'>{LOG_IN_FORM.usernameLabel} </span>
			</label>
			<input
				id='username'
				name='username'
				autoFocus
				value={loginData.username || ''}
				onChange={(e) =>
					setLoginData((state) => {
						return { ...state, username: e.target.value };
					})
				}
			/>
			<label htmlFor='password'>
				<span>
					<RiLockPasswordLine className='password-icon' />
				</span>
				<span className='password-label'>{LOG_IN_FORM.passwordLabel} </span>
			</label>
			<input
				id='password'
				type='password'
				name='password'
				autoComplete='on'
				value={loginData.password || ''}
				onChange={(e) =>
					setLoginData((state) => {
						return { ...state, password: e.target.value };
					})
				}
			/>

			<button type='submit' className='login-btn' onClick={loginUser}>
				{LOG_IN_FORM.logInButtonLabel}
			</button>
		</form>
	);
}

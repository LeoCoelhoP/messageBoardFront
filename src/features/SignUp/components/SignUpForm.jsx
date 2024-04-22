import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordLine } from 'react-icons/ri';

import AvatarsContainer from '../../../components/AvatarsContainer';
import {
	SIGN_UP_FORM,
	SUCCESS_SIGN_UP,
	ERROR_SIGN_UP,
} from '../../../data/UIMessages/SignUpPage';

export default function SignUp() {
	const navigate = useNavigate();
	const [signupData, setSignupData] = useState({
		username: '',
		password: '',
		avatarID: null,
	});

	const cachedSignUpFn = useCallback(
		async function signupUser(e) {
			e.preventDefault();
			const { username, password, avatarID } = signupData;
			if (!avatarID) {
				toast.error(ERROR_SIGN_UP.picture);
				return;
			}
			if (!username) {
				toast.error(ERROR_SIGN_UP.username);
				return;
			}
			if (!password) {
				toast.error(ERROR_SIGN_UP.password);
				return;
			}

			try {
				const { data } = await axios.post('/api/auth/signup', {
					username,
					password,
					avatarID,
				});
				if (data.error) toast.error(data.error);
				else {
					setSignupData({});
					toast.success(SUCCESS_SIGN_UP);
					navigate('/login', { replace: true });
				}
			} catch (err) {
				console.log(err);
			}
		},
		[navigate, signupData],
	);

	useEffect(() => {
		function EnterEvent(e) {
			if (e.key === 'Enter') cachedSignUpFn(e);
		}
		window.addEventListener('keydown', EnterEvent);

		return () => window.removeEventListener('keydown', EnterEvent);
	}, [cachedSignUpFn]);
	return (
		<form className='signup-form' onSubmit={cachedSignUpFn} autoComplete='off'>
			<AvatarsContainer setSignupData={setSignupData} />

			<label htmlFor='username-signup'>
				<span>
					<CgProfile className='username-icon' />
				</span>
				<span className='username-signup-label'>
					{SIGN_UP_FORM.usernameLabel}
				</span>
			</label>
			<input
				type='text'
				id='username-signup'
				value={signupData.username}
				autoComplete='new-username'
				autoFocus
				onChange={(e) =>
					setSignupData((state) => {
						return { ...state, username: e.target.value };
					})
				}
			/>

			<label htmlFor='password-signup'>
				<span>
					<RiLockPasswordLine className='password-icon' />
				</span>
				<span className='password-signup-label'>
					{SIGN_UP_FORM.passwordLabel}
				</span>
			</label>
			<input
				id='password-signup'
				type='password'
				value={signupData.password}
				autoComplete='new-password'
				onChange={(e) =>
					setSignupData((state) => {
						return { ...state, password: e.target.value };
					})
				}
			/>

			<button type='submit' className='signup-btn'>
				{SIGN_UP_FORM.signUpButtonLabel}
			</button>
		</form>
	);
}

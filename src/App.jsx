/* eslint-disable react/no-unknown-property */
import Login from './pages/Login';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import UserContextProvider from './context/UserContext';
import ProtectedRoute from './features/Authentication/ProtectedRoute';
import Redirect from './components/Redirect';
import Home from './pages/Home';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { OrbitControls } from '@react-three/drei';

axios.defaults.baseURL = 'https://messageboardapi-xxj0.onrender.com/';
axios.defaults.withCredentials = true;

export default function App() {
	const [sizes] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	return (
		<UserContextProvider>
			<Toaster
				position='top-center'
				toastOptions={{ duration: 2000 }}
				containerClassName='toaster'
			/>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path='/chat' element={<Chat />} />
				</Route>
				<Route
					path='/'
					element={
						<Canvas
							dpr={[1, 2]}
							className='r3f'
							camera={{
								fov: sizes.width < 450 ? 60 : sizes.width < 700 ? 50 : 35,
								near: 0.1,
								far: 50,
								position: sizes.width < 450 ? [0, 0, 5] : [-2.5, 0, 5],
							}}>
							{sizes.width < 450 && <OrbitControls enableRotate={false} />}
							<Home />
						</Canvas>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='*' element={<Redirect url='/' />} />
			</Routes>
		</UserContextProvider>
	);
}

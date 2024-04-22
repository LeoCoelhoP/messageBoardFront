import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (!user)
			axios.get('api/auth/profile').then(({ data }) => {
				setUser(data);
			});
	}, [user]);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

UserContextProvider.propTypes = {
	children: PropTypes.array,
};

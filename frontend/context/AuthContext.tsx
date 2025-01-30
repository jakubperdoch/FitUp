import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [userToken, setUserToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await SecureStore.getItemAsync('userToken');
				setUserToken(token ? token : null);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		checkToken();
	}, []);

	const logIn = (token) => {
		setUserToken(token);
		SecureStore.setItemAsync('userToken', token);
	};

	const logOut = () => {
		setUserToken(null);
		SecureStore.deleteItemAsync('userToken');
	};

	return (
		<AuthContext.Provider value={{ logIn, logOut, userToken, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

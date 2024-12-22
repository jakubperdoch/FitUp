import { createContext, useContext } from 'react';
import { useState } from 'react';

const NavbarContext = createContext(null);

export const NavbarProvider = ({ children }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [navbarTitle, setNavbarTitle] = useState('');
	const [showBackButton, setShowBackButton] = useState(false);
	const [showDetailsButton, setShowDetailsButton] = useState(false);

	return (
		<NavbarContext.Provider
			value={{
				navbarTitle,
				setNavbarTitle,
				showBackButton,
				setShowBackButton,
				showDetailsButton,
				setShowDetailsButton,
				isVisible,
				setIsVisible,
			}}>
			{children}
		</NavbarContext.Provider>
	);
};

export const useNavbar = () => useContext(NavbarContext);

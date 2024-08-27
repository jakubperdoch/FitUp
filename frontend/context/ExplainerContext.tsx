import { createContext, useContext } from 'react';
import { useState } from 'react';

const ExplainerContext = createContext(null);

export const ExplainerProvider = ({ children }) => {
	const [explainerTitle, setExplainerTitle] = useState('');
	const [explainerDescription, setExplainerDescription] = useState('');

	return (
		<ExplainerContext.Provider
			value={{
				explainerTitle,
				setExplainerTitle,
				explainerDescription,
				setExplainerDescription,
			}}>
			{children}
		</ExplainerContext.Provider>
	);
};

export const useExplainer = () => useContext(ExplainerContext);

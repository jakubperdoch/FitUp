import { AuthProvider } from './AuthContext';
import { ExplainerProvider } from './ExplainerContext';

export const ContextProvider = ({ children }) => {
	return (
		<AuthProvider>
			<ExplainerProvider>{children}</ExplainerProvider>
		</AuthProvider>
	);
};

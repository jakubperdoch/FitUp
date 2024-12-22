import { AuthProvider } from './AuthContext';
import { ExplainerProvider } from './ExplainerContext';
import { NavbarProvider } from './NavbarContaxt';

export const ContextProvider = ({ children }) => {
	return (
		<AuthProvider>
			<NavbarProvider>
				<ExplainerProvider>{children}</ExplainerProvider>
			</NavbarProvider>
		</AuthProvider>
	);
};

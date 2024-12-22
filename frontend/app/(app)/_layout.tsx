import { Slot } from 'expo-router';
import TopNavigationComponent from '@/components/custom/TopNavigation';
import FooterComponent from '@/components/custom/Footer';
import { useNavbar } from '@/context/NavbarContaxt';

const AppLayout = () => {
	const { navbarTitle, showBackButton, isVisible, showDetailsButton } =
		useNavbar();

	return (
		<>
			<TopNavigationComponent
				isVisible={isVisible}
				isDetailsButton={showDetailsButton}
				title={navbarTitle}
				isBackButton={showBackButton}
			/>
			<Slot />
			<FooterComponent />
		</>
	);
};

export default AppLayout;

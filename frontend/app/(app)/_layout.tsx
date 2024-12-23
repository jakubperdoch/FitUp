import { Slot } from 'expo-router';
import TopNavigationComponent from '@/components/custom/TopNavigation';
import FooterComponent from '@/components/custom/Footer';
import { useNavbar } from '@/context/NavbarContaxt';
import { View } from 'react-native';

const AppLayout = () => {
	const { navbarTitle, showBackButton, isVisible, showDetailsButton } =
		useNavbar();

	return (
		<View className='relative h-full'>
			<TopNavigationComponent
				isVisible={isVisible}
				isDetailsButton={showDetailsButton}
				title={navbarTitle}
				isBackButton={showBackButton}
			/>
			<Slot />
			<FooterComponent />
		</View>
	);
};

export default AppLayout;

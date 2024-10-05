import { Slot } from 'expo-router';
import { Text, View } from 'react-native';
import TopNavigationComponent from '@/components/custom/TopNavigation';
import FooterComponent from '@/components/custom/Footer';

const AppLayout = () => {
	return (
		<>
			<TopNavigationComponent />
			<Slot />
			<FooterComponent />
		</>
	);
};

export default AppLayout;

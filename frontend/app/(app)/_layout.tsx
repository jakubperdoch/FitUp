import { Slot } from 'expo-router';
import { Text, View } from 'react-native';
import TopNavigationComponent from '@/components/custom/TopNavigation';
const AppLayout = () => {

	return (
		<>
			<TopNavigationComponent />
			<Slot />
		</>
	);
};

export default AppLayout;

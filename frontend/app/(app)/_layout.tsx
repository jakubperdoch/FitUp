import { Slot } from 'expo-router';
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

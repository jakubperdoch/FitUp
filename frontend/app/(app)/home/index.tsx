import { View, Text } from 'react-native';
import DashBoardComponent from '@/components/custom/DashboardPanel';

const HomeScreen = () => {
	return (
		<View>
			<Text>Overview</Text>
			<DashBoardComponent />
		</View>
	);
};

export default HomeScreen;

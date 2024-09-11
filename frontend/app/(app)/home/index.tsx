import { View, Text } from 'react-native';
import DashBoardComponent from '@/components/custom/DashboardPanel';

const HomeScreen = () => {
	return (
		<View className='flex flex-col h-full items-center px-7 pt-5 w-full'>
			<Text className='self-start'>Overview</Text>
			<DashBoardComponent />
		</View>
	);
};

export default HomeScreen;

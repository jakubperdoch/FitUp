import { View, Text } from 'react-native';
import DashBoardComponent from '@/components/custom/DashboardPanel';

const HomeScreen = () => {
	return (
		<View className='flex flex-col h-full items-center px-7 pt-5 w-full gap-6'>
			<Text className='self-start font-poppinsSemiBold text-3xl'>Overview</Text>
			<DashBoardComponent />
		</View>
	);
};

export default HomeScreen;

import { View, Text, TouchableOpacity } from 'react-native';
import { Switch } from 'tamagui';

const DashboardCardComponent = ({ id, name, date }) => {
	const dateHandler = (date: string) => {
		const currentDate = new Date().toLocaleDateString();
		if (currentDate != date) {
			return <Text>{date}</Text>;
		}
		return <Text>Today</Text>;
	};

	return (
		<TouchableOpacity className='w-full gap-1 bg-white shadow-soft-1  px-4 py-5 rounded-3xl'>
			<Text className='font-poppins text-xl'>{name}</Text>
			<View className='flex-row gap-2'>
				<Text className='text-[#7B6F72] font-poppins text-lg'>
					{dateHandler(date.date)}
				</Text>
				<Text className='text-[#7B6F72] font-poppins text-lg'>|</Text>
				<Text className='text-[#7B6F72] font-poppins text-lg'>{date.time}</Text>
				<Switch size='$4'>
					<Switch.Thumb animation='bouncy' />
				</Switch>
			</View>
		</TouchableOpacity>
	);
};

export default DashboardCardComponent;

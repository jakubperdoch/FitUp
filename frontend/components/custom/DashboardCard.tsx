import { View, Text, TouchableOpacity } from 'react-native';

import TimeButton from './TimeButton';

type ComponentProps = {
	id: number;
	name: string;
	date: {
		date: string;
		time: string;
	};
	showTimer?: boolean;
	timer?: number | null;
	timerHandler?: (timer) => void;
};

const DashboardCardComponent = ({
	name,
	date,
	showTimer,
	timer,
	timerHandler,
}: ComponentProps) => {
	const dateHandler = (date: string) => {
		const currentDate = new Date().toLocaleDateString();
		if (currentDate != date) {
			return <Text>{date}</Text>;
		}
		return <Text>Today</Text>;
	};

	return (
		<TouchableOpacity className='w-full gap-1 bg-white shadow-soft-1  px-5 py-5 rounded-3xl flex-row justify-between'>
			<View className='gap-1'>
				<Text className='font-poppins text-lg'>{name}</Text>
				<View className='flex-row gap-2'>
					<Text className='text-[#7B6F72] font-poppins'>
						{dateHandler(date.date)}
					</Text>
					<Text className='text-[#7B6F72] font-poppins'>|</Text>
					<Text className='text-[#7B6F72] font-poppins'>{date.time}</Text>
				</View>
			</View>

			{showTimer && (
				<TimeButton
					timer={timer}
					timerHandler={timerHandler}
				/>
			)}
		</TouchableOpacity>
	);
};

export default DashboardCardComponent;

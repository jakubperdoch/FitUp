import { View, Text, TouchableOpacity } from 'react-native';

import TimeButton from '../Button/TimeButton';

type ComponentProps = {
	id: number;
	name: string;
	date?: {
		date: string;
		time: string;
	};
	showTimer?: boolean;
	timer?: number | null;
	timerHandler?: (timer) => void;

	quantity: string;
	totalCal: string;
	detailsHandler: (id: number) => void;
};

const DashboardCardComponent = ({
	id,
	name,
	date,
	showTimer,
	timer,
	quantity,
	totalCal,
	timerHandler,
	detailsHandler,
}: ComponentProps) => {
	const dateHandler = (date: string) => {
		const currentDate = new Date().toLocaleDateString();
		if (currentDate != date) {
			return <Text>{date}</Text>;
		}
		return <Text>Today</Text>;
	};

	return (
		<TouchableOpacity
			onPress={() => detailsHandler(id)}
			className='w-full gap-2 bg-white shadow-soft-1  px-4 py-5 rounded-3xl flex-row justify-between'>
			<View className='gap-1'>
				<Text className='font-poppins text-lg'>{name}</Text>
				<View className='flex-row gap-2'>
					{date && (
						<>
							<Text className='text-[#7B6F72] font-poppins'>
								{dateHandler(date.date)}
							</Text>
							<Text className='text-[#7B6F72] font-poppins'>|</Text>
							<Text className='text-[#7B6F72] font-poppins'>{date.time}</Text>
						</>
					)}

					{totalCal && (
						<>
							<Text className='text-[#7B6F72] font-poppins'>{totalCal}</Text>
							<Text className='text-[#7B6F72] font-poppins'>|</Text>
							<Text className='text-[#7B6F72] font-poppins'>{quantity}</Text>
						</>
					)}
				</View>
			</View>

			{showTimer && <TimeButton timer={timer} timerHandler={timerHandler} />}
		</TouchableOpacity>
	);
};

export default DashboardCardComponent;

import { View, Text, TouchableOpacity } from 'react-native';
import { Switch } from '@/components/ui/switch';

type ComponentProps = {
	id: number;
	name: string;
	date: {
		date: string;
		time: string;
	};
	showSwitch?: boolean;
	onSwitchHadnler?: void;
};

const DashboardCardComponent = ({
	name,
	date,
	showSwitch,
	onSwitchHadnler,
}: ComponentProps) => {
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
			<View className='flex-row gap-2 items-center w-full'>
				<Text className='text-[#7B6F72] font-poppins text-lg'>
					{dateHandler(date.date)}
				</Text>
				<Text className='text-[#7B6F72] font-poppins text-lg'>|</Text>
				<Text className='text-[#7B6F72] font-poppins text-lg'>{date.time}</Text>
				{showSwitch && (
					<Switch
						className='ms-auto'
						size='md'
						isDisabled={false}
						trackColor={{ false: `#E4E4E4`, true: `#F77F00` }}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default DashboardCardComponent;

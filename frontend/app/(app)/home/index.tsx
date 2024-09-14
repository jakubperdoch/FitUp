import { View, Text, TouchableOpacity } from 'react-native';
import DashBoardComponent from '@/components/custom/DashboardPanel';
import GenericIcon from '@/components/custom/Icon';
import GradientSelectComponent from '@/components/custom/GradientSelect';

const HomeScreen = () => {
	const foodOptions = [
		{
			label: 'Breakfast',
			value: 'breakfast',
		},
		{
			label: 'Lunch',
			value: 'lunch',
		},
		{
			label: 'Dinner',
			value: 'dinner',
		},
		{
			label: 'Custom',
			value: 'custom',
		},
	];

	return (
		<View className='flex flex-col h-full items-center px-7 pt-5 w-full gap-6'>
			<Text className='self-start font-poppinsSemiBold text-2xl'>Overview</Text>
			<DashBoardComponent />

			<View className='self-start w-full'>
				<View className='flex-row w-full items-center gap-3 mt-4'>
					<Text className='font-poppinsSemiBold text-2xl'>Today Meals</Text>
					<TouchableOpacity>
						<GenericIcon
							name='Plus'
							color='#F77F00'
							size={25}
						/>
					</TouchableOpacity>

					<GradientSelectComponent
						placeholder={'Choose Gender'}
						controllerName={null}
						control={null}
						options={foodOptions}
					/>
				</View>
			</View>
		</View>
	);
};

export default HomeScreen;

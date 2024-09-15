import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DashBoardComponent from '@/components/custom/DashboardPanel';
import GenericIcon from '@/components/custom/Icon';
import GradientSelectComponent from '@/components/custom/GradientSelect';
import MealItemComponent from '@/components/custom/DashboardCard';
import useCurrentDateHandler from '@/utils/date';

const HomeScreen = () => {
	const { currentDate, formattedDate, formattedTime } = useCurrentDateHandler();

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

	const meals = [
		{
			name: 'Salmon Nigiri',
			date: currentDate,
		},
		{
			name: 'Lowfat Milk',
			date: currentDate,
		},
	];

	const workouts = [];

	return (
		<ScrollView>
			<View className='flex flex-col h-full items-center px-7 pt-5 w-full gap-6'>
				<Text className='self-start font-poppinsSemiBold text-2xl'>Overview</Text>
				<DashBoardComponent />

				<View className='self-start w-full flex-col'>
					<View className='flex-row w-full items-center justify-between gap-3 mt-4'>
						<View className='flex-row  items-center gap-3'>
							<Text className='font-poppinsSemiBold text-2xl'>Today Meals</Text>
							<TouchableOpacity>
								<GenericIcon
									name='Plus'
									color='#F77F00'
									size={25}
								/>
							</TouchableOpacity>
						</View>

						<GradientSelectComponent
							placeholder={'Choose Gender'}
							controllerName={null}
							control={null}
							options={foodOptions}
						/>
					</View>
					<View className='gap-5 mt-6 justify-center flex-col items-center'>
						{meals.map((meal, index) => {
							return (
								<MealItemComponent
									name={meal.name}
									date={meal.date}
									id={index}
									key={index}
								/>
							);
						})}

						<TouchableOpacity>
							<Text className='text-[#ADA4A5] font-poppins text-lg mt-2'>
								See More
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default HomeScreen;

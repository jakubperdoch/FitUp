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

	const dashBoardPanels = [
		{
			title: 'Today Meals',
			onAddHandler: () => console.log('Add Meal'),
			onShowMoreHandler: () => console.log('Show More Workouts'),
			showSelect: true,
			cards: [
				{
					name: 'Salmon Nigiri',
					date: currentDate,
				},
				{
					name: 'Lowfat Milk',
					date: currentDate,
				},
			],
		},
		{
			title: 'Upcoming Workout',
			onAddHandler: () => console.log('Add Workout'),
			onShowMoreHandler: () => console.log('Show More Workouts'),
			showSelect: false,
			cards: [
				{
					name: 'Upperbody Workout',
					date: currentDate,
					showSwitch: true,
				},
				{
					name: 'Fullbody Workout',
					date: currentDate,
					showSwitch: true,
				},
			],
		},
	];

	return (
		<ScrollView>
			<View className='flex flex-col h-full items-center px-7 pt-5 w-full gap-6'>
				<Text className='self-start font-poppinsSemiBold text-2xl'>Overview</Text>
				<DashBoardComponent />

				{dashBoardPanels.map((dashBoardPanel, panelIndex) => {
					return (
						<View
							className='self-start w-full flex-col mb-3'
							key={panelIndex}>
							<View className='flex-row w-full items-center justify-between gap-3 mt-4'>
								<View className='flex-row  items-center gap-3'>
									<Text className='font-poppinsSemiBold text-2xl'>
										{dashBoardPanel.title}
									</Text>
									<TouchableOpacity onPress={() => dashBoardPanel.onAddHandler()}>
										<GenericIcon
											name='Plus'
											color='#F77F00'
											size={25}
										/>
									</TouchableOpacity>
								</View>

								{dashBoardPanel.showSelect && (
									<GradientSelectComponent
										placeholder={'Choose Gender'}
										controllerName={null}
										control={null}
										options={foodOptions}
									/>
								)}
							</View>
							<View className='gap-5 mt-6 justify-center flex-col items-center'>
								{dashBoardPanel.cards.map((card, cardIndex: number) => {
									return (
										<MealItemComponent
											name={card.name}
											date={card.date}
											id={cardIndex}
											key={cardIndex}
										/>
									);
								})}

								<TouchableOpacity onPress={() => dashBoardPanel.onShowMoreHandler()}>
									<Text className='text-[#ADA4A5] font-poppins text-lg mt-2'>
										See More
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
};

export default HomeScreen;

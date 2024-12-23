import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import DashBoardComponent from '@/components/custom/Dashboard/DashboardPanel';
import GenericIcon from '@/components/custom/Icon';
import GradientSelectComponent from '@/components/custom/Inputs/GradientSelect';
import MealItemComponent from '@/components/custom/Dashboard/DashboardCard';
import useCurrentDateHandler from '@/utils/date';
import { router } from 'expo-router';
import { useNavbar } from '@/context/NavbarContaxt';

const HomeScreen = () => {
	const { currentDate } = useCurrentDateHandler();
	const { setNavbarTitle } = useNavbar();

	useEffect(() => {
		setNavbarTitle('Fit Up');
	}, []);

	const foodOptions = [
		{
			name: 'Breakfast',
			value: 'breakfast',
		},
		{
			name: 'Morning Snack',
			value: 'morningSnack',
		},
		{
			name: 'Lunch',
			value: 'lunch',
		},
		{
			name: 'Afternoon Snack',
			value: 'afternoonSnack',
		},
		{
			name: 'Dinner',
			value: 'dinner',
		},
		{
			name: 'Late Night Snack',
			value: 'lateNightSnack',
		},
	];

	const [dashBoardPanels, setDashBoardPanels] = useState([
		{
			title: 'Today Meals',
			onAddHandler: () => console.log('Add Meal'),
			onShowMoreHandler: () => router.push('/meals'),
			detailsHandler: (id: number) => router.push(`/meals/details/${id}`),
			showSelect: true,
			cards: [
				{
					id: 10,
					name: 'Salmon Nigiri',
					totalCals: '300kCal',
					quantity: '200g',
				},
				{
					id: 11,
					name: 'Lowfat Milk',
					totalCals: '300kCal',
					quantity: '200g',
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
					showTimer: true,
					timer: null,
					timerHandler: (value: number, id: number) => {
						const newPanel = [...dashBoardPanels];

						newPanel[1].cards[id] = {
							...newPanel[1].cards[id],
							timer: value,
						};

						setDashBoardPanels(() => {
							return newPanel;
						});
						console.log(value);
					},
				},
				{
					name: 'Fullbody Workout',
					date: currentDate,
					showTimer: true,
					timer: null,
					timerHandler: (value: number, id: number) => {
						const newPanel = [...dashBoardPanels];

						newPanel[1].cards[id] = {
							...newPanel[1].cards[id],
							timer: value,
						};

						setDashBoardPanels(() => {
							return newPanel;
						});
						console.log(value);
					},
				},
			],
		},
	]);

	return (
		<ScrollView>
			<View className='flex flex-col h-full items-center px-7 pt-5 w-full gap-6 mb-20'>
				<Text className='self-start font-poppinsSemiBold text-2xl'>Overview</Text>
				<DashBoardComponent />

				{dashBoardPanels.map((dashBoardPanel, panelIndex) => {
					return (
						<View className='self-start w-full flex-col mb-4' key={panelIndex}>
							<View className='flex-row w-full items-center justify-between gap-3 mt-4'>
								<View className='flex-row items-center gap-3'>
									<Text className='font-poppinsSemiBold text-2xl'>
										{dashBoardPanel.title}
									</Text>
									<TouchableOpacity onPress={() => dashBoardPanel.onAddHandler()}>
										<GenericIcon name='Plus' color='#F77F00' size={25} />
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
								{dashBoardPanel.cards.map((card, cardIndex) => {
									return (
										<MealItemComponent
											name={card.name}
											date={card.date}
											totalCal={card.totalCals}
											quantity={card.quantity}
											showTimer={card.showTimer}
											detailsHandler={dashBoardPanel.detailsHandler}
											timer={card.timer}
											timerHandler={(value) => card.timerHandler(value, cardIndex)}
											id={card.id}
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

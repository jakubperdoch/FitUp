// here user will have see all entered meals in specific day
import { ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import DatePanelComponent from '@/components/custom/DatePanel';
import FoodCardComponent from '@/components/custom/FoodCard';
import MealDrawerComponent from '@/components/custom/MealDrawer';

const MealsPage = () => {
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [index, setIndex] = useState(3);

	const ComponentData = [
		{
			title: 'Breakfast',
			numberOfMeals: 2,
			numberOfCals: 400,

			meals: [
				{
					image:
						'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
					foodName: 'Burger',
					time: '07:00am',
					detailsRoute: '',
				},
				{
					image:
						'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
					foodName: 'Burger',
					time: '07:30am',
					detailsRoute: '',
				},
			],
		},
		{
			title: 'Lunch',
			numberOfMeals: 2,
			numberOfCals: 400,

			meals: [
				{
					image:
						'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
					foodName: 'Burger',
					time: '07:00am',
					detailsRoute: '',
				},
				{
					image:
						'https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg',
					foodName: 'Burger',
					time: '07:30am',
					detailsRoute: '',
				},
			],
		},
	];

	return (
		<ScrollView>
			<DatePanelComponent
				dates={dates}
				selectedDate={selectedDate}
				index={index}
				setDates={setDates}
				setSelectedDate={setSelectedDate}
				setIndex={setIndex}
			/>

			{ComponentData.map((section, id) => (
				<FoodCardComponent
					key={id}
					title={section.title}
					numberOfCals={section.numberOfCals}
					numberOfMeals={section.numberOfMeals}
					meals={section.meals}
				/>
			))}

			<MealDrawerComponent />
		</ScrollView>
	);
};

export default MealsPage;

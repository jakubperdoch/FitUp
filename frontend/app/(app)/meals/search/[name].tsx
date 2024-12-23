// here user will able to search meals
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavbar } from '@/context/NavbarContaxt';
import { useEffect } from 'react';
import FoodScrollComponent from '@/components/custom/Meals/Scroll';
import CategoryScrollComponent from '@/components/custom/Meals/Scroll/CategoryScroll';

const MealsSearchPage = () => {
	const { name } = useLocalSearchParams();
	const { setNavbarTitle } = useNavbar();

	useEffect(() => {
		const nameString = Array.isArray(name) ? name[0] : name;

		if (nameString) {
			const navbarTitle = nameString
				.replace(/([A-Z])/g, ' $1')
				.replace(/^./, (str) => str.toUpperCase());
			setNavbarTitle(navbarTitle);
		}
	}, [name, setNavbarTitle]);

	const meals = [
		{ id: 1, name: 'Chicken', calories: 200 },
		{ id: 2, name: 'Beef', calories: 300 },
		{ id: 3, name: 'Fish', calories: 150 },
		{ id: 4, name: 'Pork', calories: 250 },
		{ id: 5, name: 'Lamb', calories: 400 },
		{ id: 6, name: 'Burger', calories: 500 },
		{ id: 7, name: 'Pizza', calories: 600 },
		{ id: 8, name: 'Pasta', calories: 700 },
		{ id: 9, name: 'Rice', calories: 800 },
	];

	const categories = [
		{
			id: 1,
			name: 'Salads',
		},
		{
			id: 2,
			name: 'Soups',
		},
		{
			id: 3,
			name: 'Main Courses',
		},
		{
			id: 4,
			name: 'Desserts',
		},
		{
			id: 5,
			name: 'Drinks',
		},

		{
			id: 6,
			name: 'Appetizers',
		},
	];

	const onClick = (id: number) => {
		console.log(`Clicked on meal with id: ${id}`);
	};

	return (
		<View className='flex flex-col gap-7'>
			<Text>Search for {name}</Text>

			<CategoryScrollComponent categories={categories} onClick={onClick} />

			<FoodScrollComponent meals={meals} onClick={onClick} />
		</View>
	);
};

export default MealsSearchPage;

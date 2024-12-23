// here user will able to search meals
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavbar } from '@/context/NavbarContaxt';
import { useEffect } from 'react';
import FoodScrollComponent from '@/components/custom/Meals/Scroll';

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
	];

	const onClick = (id: number) => {
		console.log(`Clicked on meal with id: ${id}`);
	};

	return (
		<View>
			<Text>Meal Search</Text>
			<Text>Search for {name}</Text>

			<FoodScrollComponent meals={meals} onClick={onClick} />
		</View>
	);
};

export default MealsSearchPage;

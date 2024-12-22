// here user will able to search meals
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavbar } from '@/context/NavbarContaxt';
import { useEffect } from 'react';

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

	return (
		<View>
			<Text>Meal Search</Text>
			<Text>Search for {name}</Text>
		</View>
	);
};

export default MealsSearchPage;

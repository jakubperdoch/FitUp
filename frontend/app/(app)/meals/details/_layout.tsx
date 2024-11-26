import { View, Text } from 'react-native';
import { Slot } from 'expo-router';

const MealDetailsLayout = () => {
	return (
		<View>
			<Text>Ahoj</Text>
			<Slot />
		</View>
	);
};

export default MealDetailsLayout;

import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const DetailsScreen = () => {
	const { id } = useLocalSearchParams();

	return <Text>Meal:{id}</Text>;
};


export default DetailsScreen
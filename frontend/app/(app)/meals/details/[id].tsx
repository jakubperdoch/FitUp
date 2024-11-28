import { useLocalSearchParams } from 'expo-router';
import { Text, Image, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const insets = useSafeAreaInsets();
	return (
		<>
			<Image
				style={{ top: -insets.top, height: 500 }}
				className='absolute w-full '
				source={require('@/assets/images/mealsDetails.png')}
			/>

			<ScrollView className='bg-white rounded-[4rem] mt-72'>
				<Text>{id}</Text>
			</ScrollView>
		</>
	);
};

export default DetailsScreen;

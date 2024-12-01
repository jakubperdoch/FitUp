import { useLocalSearchParams } from 'expo-router';
import { Text, Image, ScrollView, View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ServingInputComponent from '@/components/custom/ServingInput';

const DetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const insets = useSafeAreaInsets();

	const nutritionData = [
		{
			icon: require('@/assets/icons/fire.png'),
			value: 180,
			type: null,
			metric: 'kCal',
		},
		{
			icon: require('@/assets/icons/trans-fats.png'),
			value: 30,
			type: 'fats',
			metric: 'g',
		},
		{
			icon: require('@/assets/icons/protein.png'),
			value: 20,
			type: 'proteins',
			metric: 'g',
		},
		{
			icon: require('@/assets/icons/carbohydrates.png'),
			value: 50,
			type: 'carbs',
			metric: 'g',
		},
		{
			icon: require('@/assets/icons/sugar-cube.png'),
			value: 50,
			type: 'sugar',
			metric: 'g',
		},
		{
			icon: require('@/assets/icons/grain.png'),
			value: 10,
			type: 'fiber',
			metric: 'g',
		},
	];

	const allergensData = [
		{
			id: '24904',
			name: 'Fish',
			value: '-1',
		},
		{
			id: '24905',
			name: 'Soy',
			value: '-1',
		},
		{
			id: '24906',
			name: 'Nuts',
			value: '-1',
		},
		{
			id: '24907',
			name: 'Lactose',
			value: '-1',
		},
		{
			id: '24908',
			name: 'Shellfish',
			value: '-1',
		},
		{
			id: '24909',
			name: 'Egg',
			value: '-1',
		},
		{
			id: '24910',
			name: 'Sesame',
			value: '-1',
		},
	];

	return (
		<>
			<Image
				style={{ top: -insets.top, height: 500 }}
				className='absolute w-full '
				source={require('@/assets/images/mealsDetails.png')}
			/>

			<ScrollView className='bg-white rounded-[4rem] py-12  mt-72'>
				<Text className='font-bold text-2xl ms-11'>{id}</Text>

				<View className='mt-10 ms-6'>
					<Text className='font-semibold text-2xl mb-5'>Nutrition</Text>

					<FlatList
						data={nutritionData}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View className='w-6' />}
						renderItem={({ item }) => (
							<LinearGradient
								start={{ x: 1, y: 0 }}
								end={{ x: 0.1, y: 0.8 }}
								colors={['rgba(214, 40, 40, 0.3)', 'rgba(247, 127, 0, 0.3)']}
								style={{
									height: 50,
									borderRadius: 15,
									paddingHorizontal: 15,
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<View className='flex flex-row items-center gap-1'>
									<Image className='h-9 w-9' source={item.icon} />
									<Text className='font-poppins'>
										{item.value}
										{item.metric} {item.type}
									</Text>
								</View>
							</LinearGradient>
						)}
					/>
				</View>

				<View className='mt-10 ms-6'>
					<Text className='font-semibold text-2xl mb-5'>Allergens</Text>

					<View className='flex flex-wrap flex-row gap-3 w-full'>
						{allergensData.map((allergen) => (
							<View key={allergen.id} className='bg-[#E5E6E6] px-3 py-1 rounded-xl'>
								<Text className='text-lg font-poppins'>{allergen.name}</Text>
							</View>
						))}
					</View>
				</View>

				<View className='mt-10 ms-6'>
					<Text className='font-semibold text-2xl mb-5'>Serving Size</Text>
					<ServingInputComponent />
				</View>

				<View className='mt-10 ms-6'>
					<Text className='font-semibold text-2xl mb-5'>Eaten During...</Text>
				</View>

				<View className='mt-10 ms-6'>
					<Text className='font-semibold text-2xl mb-5'>Date</Text>
				</View>
			</ScrollView>
		</>
	);
};

export default DetailsScreen;

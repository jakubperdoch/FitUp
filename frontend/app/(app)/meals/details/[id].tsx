import { useLocalSearchParams } from 'expo-router';
import {
	Text,
	Image,
	ScrollView,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ServingInputComponent from '@/components/custom/Inputs/ServingInput';
import { useState } from 'react';
import GenericIcon from '@/components/custom/Icon';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import ModalComponent from '@/components/custom/Modal';
var localizedFormat = require('dayjs/plugin/localizedFormat');

const DetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const insets = useSafeAreaInsets();
	dayjs.extend(localizedFormat);

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

	const [servingTypes, setServingTypes] = useState([
		{
			serving_id: '50321',
			serving_description: '100 g',
			metric_serving_amount: '100.000',
			metric_serving_unit: 'g',
		},
		{
			serving_id: '5034',
			serving_description: '1/2 small (yield after cooking, bone removed)',
			metric_serving_amount: '84.000',
			metric_serving_unit: 'g',
		},
		{
			serving_id: '4833',
			serving_description: '1 oz boneless, cooked',
			metric_serving_amount: '28.350',
			metric_serving_unit: 'g',
		},
		{
			serving_id: '5043',
			serving_description: '1 serving (98 g)',
			metric_serving_amount: '98.000',
			metric_serving_unit: 'g',
		},
	]);

	const [servingAmount, setServingAmount] = useState(1);
	const [selectedServingType, setSelectedServingType] = useState(
		servingTypes[0]
	);
	const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(null);
	const [date, setDate] = useState(null);
	const partsOfDayData = [
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

	// Modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const closeModalHandler = () => setIsModalOpen(false);

	const theme = {
		mainColor: '#F77F00',
		activeTextColor: '#fff',
	};

	return (
		<>
			<Image
				style={{ top: -insets.top, height: 500 }}
				className='absolute w-full '
				source={require('@/assets/images/mealsDetails.png')}
			/>

			<ScrollView
				style={{
					backgroundColor: 'white',
					borderRadius: 50,
					paddingVertical: 40,
					marginTop: 250,
					marginBottom: 50,
				}}
				contentContainerClassName='pb-10'
				showsVerticalScrollIndicator={false}
				automaticallyAdjustKeyboardInsets={true}>
				<Text className='font-bold text-2xl ms-11'>{id}</Text>

				<View className='mt-10'>
					<Text className='font-semibold text-2xl mb-5 ms-6'>Nutrition</Text>

					<FlatList
						data={nutritionData}
						contentContainerClassName='px-6'
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

				<View className='mt-10 mx-6 flex flex-row items-center  justify-between'>
					<Text className='font-semibold text-2xl'>Serving Size</Text>
					<ServingInputComponent
						setSelectedServingType={setSelectedServingType}
						selectedServingType={selectedServingType}
						servingAmount={servingAmount}
						servingTypes={servingTypes}
						setServingAmount={setServingAmount}
					/>
				</View>

				<View className='mt-10 ms-6'>
					<Text className='font-semibold text-2xl mb-5'>Eaten During...</Text>
					<View className='flex flex-wrap flex-row gap-3 w-full'>
						{partsOfDayData.map((time) => (
							<TouchableOpacity
								key={time.value}
								onPress={() => setSelectedTimeOfDay(time)}
								className={`px-3 py-1 rounded-xl ${
									selectedTimeOfDay?.value === time.value
										? 'bg-[#F77F00]'
										: 'bg-[#E5E6E6]'
								}`}>
								<Text className='text-lg font-poppins'>{time.name}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<View className='mt-10 mx-6'>
					<Text className='font-semibold text-2xl mb-5'>Date</Text>

					<TouchableOpacity
						onPress={() => setIsModalOpen(true)}
						className='px-6 gap-4 rounded-xl bg-[#F7F8F8] flex flex-row h-16 items-center justify-start w-full'>
						<GenericIcon name={'CalendarDays'} color={'#7B6F72'} size={20} />
						<Text
							className={`${
								date ? 'opacity-100' : 'opacity-40'
							} font-semibold font-poppins text-lg text-[#7B6F72]`}>
							{date ? date?.format('LL') : 'Date When Eaten'}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			<ModalComponent
				isModalOpen={isModalOpen}
				closeModalHandler={closeModalHandler}>
				<DateTimePicker
					mode='single'
					date={date}
					onChange={(params) => setDate(params.date)}
					headerButtonColor={theme?.mainColor}
					selectedItemColor={theme?.mainColor}
					selectedTextStyle={{
						fontWeight: 'bold',
						color: theme?.activeTextColor,
					}}
				/>
			</ModalComponent>
		</>
	);
};

export default DetailsScreen;

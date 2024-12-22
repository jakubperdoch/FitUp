import { View, Text, TouchableOpacity, Image } from 'react-native';

import GenericIcon from '../Icon';
import { router } from 'expo-router';

type Food = {
	id: number;
	image: string;
	foodName: string;
	totalCals: string;
	quantity: string;
};

type ComponentProps = {
	title: string;
	numberOfMeals: number;
	numberOfCals: number;

	meals: Food[];
};

const FoodCardComponent = ({
	title,
	numberOfMeals,
	numberOfCals,
	meals,
}: ComponentProps) => {
	return (
		<View className='px-7 mb-8 gap-4'>
			<View className='flex flex-row items-center justify-between'>
				<Text className='text-2xl font-semibold font-poppins'>{title}</Text>
				<Text className='font-poppins text-[#ADA4A5]'>
					{numberOfMeals} meals | {numberOfCals} calories
				</Text>
			</View>

			<View className='flex flex-col gap-3'>
				{meals.map((meal, id) => (
					<View key={id} className='flex flex-row w-full gap-4 items-center'>
						<Image className='h-16 w-16 rounded-2xl' source={{ uri: meal.image }} />

						<View className='flex flex-col gap-1'>
							<Text className='font-poppins text-lg '>{meal.foodName}</Text>
							<Text className='font-poppins text-[#ADA4A5] font-sm '>
								{meal.quantity}
							</Text>
						</View>

						<View className='flex flex-row ms-auto items-center gap-5'>
							<Text className='text-lg font-poppins'>{meal.totalCals}</Text>

							<TouchableOpacity
								className='border border-[#ADA4A5] rounded-full p-1'
								onPress={() => router.push(`/meals/details/${meal.id}`)}>
								<GenericIcon name={'ChevronRight'} color='#ADA4A5' size={22} />
							</TouchableOpacity>
						</View>
					</View>
				))}
			</View>
		</View>
	);
};

export default FoodCardComponent;

import { View, Text, TouchableOpacity } from 'react-native';
import GenericIcon from '../../Icon';

type Meal = {
	id: number;
	name: string;
	calories: number;
};

type ComponentProps = {
	onClick: (id: number) => void;
	meal: Meal;
};

const FoodScrollCardComponent = (props: ComponentProps) => {
	return (
		<TouchableOpacity
			onPress={() => props.onClick(props.meal.id)}
			className='shadow-sm mb-6 rounded-3xl bg-white p-5 flex flex-row justify-between items-center'>
			<View className='flex flex-col gap-1'>
				<Text className='font-poppins text-lg '>{props.meal.name}</Text>
				<Text className='font-poppins text-[#ADA4A5] font-sm '>
					{props.meal.calories}kCal
				</Text>
			</View>

			<TouchableOpacity
				onPress={() => props.onClick(props.meal.id)}
				className='border border-[#ADA4A5] rounded-full p-1'>
				<GenericIcon name='ChevronRight' color='#ADA4A5' size={22} />
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

export default FoodScrollCardComponent;

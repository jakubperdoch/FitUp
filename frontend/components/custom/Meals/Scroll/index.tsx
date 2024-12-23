import { ScrollView, Text } from 'react-native';
import FoodScrollCardComponent from './Card';

type Meal = {
	id: number;
	name: string;
	calories: number;
};

type ComponentProps = {
	meals: Meal[];
	onClick: (id: number) => void;
};

const FoodScrollComponent = (props: ComponentProps) => {
	return (
		<>
			<Text className='ms-7 text-2xl font-semibold font-poppins '>Meals</Text>
			<ScrollView className='px-7 h-2/4'>
				{props.meals.map((meal) => {
					return (
						<FoodScrollCardComponent
							key={meal?.id}
							meal={meal}
							onClick={props.onClick}
						/>
					);
				})}
			</ScrollView>
		</>
	);
};

export default FoodScrollComponent;

import { ScrollView } from 'react-native';
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
		<ScrollView className='px-7'>
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
	);
};

export default FoodScrollComponent;

import { ScrollView, Text, View } from 'react-native';
import CategoryCardComponent from './CategoryCard';

type Category = {
	id: number;
	name: string;
};

type ComponentProps = {
	onClick: (id: number) => void;
	categories: Category[];
};

const CategoryScrollComponent = (props: ComponentProps) => {
	return (
		<View className='flex flex-col gap-5'>
			<Text className='ms-7 text-2xl font-semibold font-poppins '>Category</Text>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className='px-7  '>
				{props.categories.map((category) => {
					return (
						<CategoryCardComponent
							key={category.id}
							category={category}
							onClick={props.onClick}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default CategoryScrollComponent;

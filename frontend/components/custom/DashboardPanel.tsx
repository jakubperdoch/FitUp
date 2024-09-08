import { View, Text } from 'react-native';
import DashBoardCircle from './DashboardCircle';
import { useState } from 'react';

const DashBoardComponent = () => {
	const [data, setData] = useState([
		{
			title: 'Carbs',
			value: -0.5,
		},
		{
			title: 'Fat',
			value: 0.5,
		},
	]);

	const colorVariations = ['#FE9A05', '#D62828'];

	return (
		<View>
			{data.map((dataCircle: { title: string; value: number }, index: number) => {
				return (
					<DashBoardCircle
						key={index}
						colorVariation={colorVariations}
						title={dataCircle.title}
						value={dataCircle.value}
					/>
				);
			})}
		</View>
	);
};

export default DashBoardComponent;

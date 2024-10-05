import { View, Text } from 'react-native';
import DashBoardCircle from './DashboardCircle';
import { useState } from 'react';

const DashBoardComponent = () => {
	const [data, setData] = useState([
		{
			title: 'Carbs',
			value: 0.3,
			size: 230,
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.3,
			size: 180,
			icon: 'shoe-prints',
			colors: ['#2CBF29', '#6FEE6D', '#BDFFBC'],
		},
		{
			title: 'Fat',
			value: 0.3,
			size: 230,
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.3,
			size: 180,
			icon: 'bed',
			colors: ['#569AFF', '#91BDFF', '#BCD7FF'],
		},
		{
			title: 'Calories',
			icon: 'fire-flame-curved',
			value: 0.1,
			size: 280,
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.1,
			size: 180,
			icon: 'droplet',
			colors: ['#569AFF', '#91BDFF', '#BCD7FF'],
		},
		{
			title: 'Protein',
			value: 0.3,
			size: 230,
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.3,
			size: 180,
			icon: 'dumbbell',
			colors: ['#569AFF', '#85B6FF', '#BCD7FF'],
		},
		{
			title: 'Fiber',
			value: 0.3,
			size: 230,
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
	]);

	return (
		<View className='bg-white shadow-soft-4 rounded-3xl flex flex-row items-center justify-center flex-wrap gap-4 p-4'>
			{data.map((dataCircle, index) => {
				return (
					<DashBoardCircle
						key={index}
						colorVariation={dataCircle.colors}
						title={dataCircle.title}
						value={dataCircle.value}
						size={dataCircle.size}
						icon={dataCircle.icon}
					/>
				);
			})}
		</View>
	);
};

export default DashBoardComponent;

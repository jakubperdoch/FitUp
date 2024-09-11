import { View, Text } from 'react-native';
import DashBoardCircle from './DashboardCircle';
import { useState } from 'react';

const DashBoardComponent = () => {
	const [data, setData] = useState([
		{
			title: 'Carbs',
			value: 0.3,
			size: 'md',
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.3,
			size: 'sm',
			icon: 'Footprints',
			colors: ['#05FE00', '#6FEE6D', '#BDFFBC'],
		},
		{
			title: 'Carbs',
			value: 0.3,
			size: 'md',
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.3,
			size: 'sm',
			icon: 'Bed',
			colors: ['#569AFF', '#91BDFF', '#BCD7FF'],
		},
		{
			title: 'Fat',
			value: 0.1,
			size: 'lg',
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.1,
			size: 'sm',
			icon: 'Droplet',
			colors: ['#569AFF', '#91BDFF', '#BCD7FF'],
		},
		{
			title: 'Carbs',
			value: 0.3,
			size: 'md',
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
		{
			value: 0.3,
			size: 'sm',
			icon: 'Dumbbell',
			colors: ['#569AFF', '#85B6FF', '#BCD7FF'],
		},
		{
			title: 'Carbs',
			value: 0.3,
			size: 'md',
			colors: ['#FE9A05', '#F9CD8C', '#FFE4BC'],
		},
	]);

	return (
		<View className='bg-white shadow-soft-4  rounded-xl flex flex-row items-center justify-center flex-wrap gap-8 p-4'>
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

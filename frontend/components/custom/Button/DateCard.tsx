import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type DateCardProps = {
	day: string;
	date: Date;
	selectedDate: Date;
	selectionHandler: (date: Date) => void;
};

type DateCardState = {
	colors: [string, string];
	fontColor: string;
};

const DateCardComponent = (props: DateCardProps) => {
	const [content, setContent] = useState<DateCardState>({
		colors: ['#F7F8F8', '#F7F8F8'],
		fontColor: '#7B6F72',
	});

	const currentDateHandler = () => {
		if (props.date.getDate() === props.selectedDate.getDate()) {
			setContent({
				colors: ['#F77F00', '#D62828'],
				fontColor: '#ffffff',
			});
		} else {
			setContent({
				colors: ['#F7F8F8', '#F7F8F8'],
				fontColor: '#7B6F72',
			});
		}
	};

	useEffect(() => {
		currentDateHandler();
	}, [props.selectedDate]);

	return (
		<TouchableOpacity onPress={() => props.selectionHandler(props.date)}>
			<LinearGradient
				start={{ x: 0, y: 0.15 }}
				end={{ x: 1.3, y: 0.15 }}
				colors={content?.colors}
				style={{
					height: 100,
					width: 70,
					justifyContent: 'center',
					alignItems: 'center',
					marginHorizontal: 10,
					borderRadius: 20,
				}}>
				<Text className='text-base capitalize' style={{ color: content.fontColor }}>
					{props.day}
				</Text>
				<Text className='font-bold text-lg' style={{ color: content.fontColor }}>
					{props.date.getDate()}
				</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default DateCardComponent;

import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type DateCardProps = {
	day: string;
	date: Date;
	selectedDate: Date;
	selectionHandler: (date: Date) => void;
};

const DateCardComponent = (props: DateCardProps) => {
	const currentDateHandler = () => {
		if (props.date.getDate() === props.selectedDate.getDate()) {
			return ['#F77F00', '#D62828'];
		} else {
			return ['#F7F8F8', '#F7F8F8'];
		}
	};

	return (
		<TouchableOpacity onPress={() => props.selectionHandler(props.date)}>
			<LinearGradient
				start={{ x: 0, y: 0.15 }}
				end={{ x: 1.3, y: 0.15 }}
				colors={currentDateHandler()}
				style={{
					height: 100,
					width: 70,
					justifyContent: 'center',
					alignItems: 'center',
					marginHorizontal: 10,
					borderRadius: 20,
				}}>
				<Text className='capitalize'>{props.day}</Text>
				<Text>{props.date.getDate()}</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default DateCardComponent;

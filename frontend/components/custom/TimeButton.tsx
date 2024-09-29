import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Text, View } from 'react-native';
import GenericIcon from './Icon';
import { useEffect, useState, useRef } from 'react';

const TimeButton = () => {
	const [buttonState, setButtonState] = useState(false);
	const [buttonIcon, setButtonIcon] = useState('Play');
	const [time, setTime] = useState(0);
	const intervalRef = useRef(null);

	const buttonStateHandler = () => {
		setButtonState((prevState) => !prevState);
	};

	const timeHandler = (timeValue: number) => {
		if (timeValue < 60) {
			return <Text>{timeValue}s</Text>;
		} else if (timeValue < 3600) {
			const minutes = Math.floor(timeValue / 60);
			return <Text>{minutes} min</Text>;
		} else {
			const hours = Math.floor(timeValue / 3600);
			const minutes = Math.floor((timeValue % 3600) / 60);
			return (
				<Text>
					{hours} hour{hours > 1 ? 's' : ''} {minutes > 0 ? `${minutes} min` : ''}{' '}
				</Text>
			);
		}
	};

	useEffect(() => {
		if (buttonState) {
			setButtonIcon('Pause');
			intervalRef.current = setInterval(() => {
				setTime((prevSeconds) => prevSeconds + 1);
			}, 1000);
		} else {
			setButtonIcon('Play');
			clearInterval(intervalRef.current);
		}

		return () => clearInterval(intervalRef.current);
	}, [buttonState]);

	return (
		<View className='flex flex-col items-center justify-center gap-1'>
			<TouchableOpacity onPress={buttonStateHandler}>
				<LinearGradient
					start={{ x: 0, y: 0.75 }}
					end={{ x: 1.3, y: 0.25 }}
					colors={buttonState ? ['#D62828', '#D62828'] : ['#2CBF29', '#24E022']}
					style={{
						height: 35,
						width: 35,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 50,
					}}>
					<GenericIcon
						name={buttonIcon}
						size={15}
						color='white'
						fill='white'
					/>
				</LinearGradient>
			</TouchableOpacity>
			<Text>{timeHandler(time)}</Text>
		</View>
	);
};

export default TimeButton;

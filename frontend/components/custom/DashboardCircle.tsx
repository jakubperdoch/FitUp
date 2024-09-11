import { View, Text } from 'react-native';
import Svg, { Circle, LinearGradient, Stop, Defs } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import { useAnimatedProps, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import GenericIcon from './Icon';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const strokeWidth = 7;
const circleLength = 200;
const radius = circleLength / (2 * Math.PI);
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const DashBoardCircle = ({ value, colorVariation, title, size, icon }) => {
	const [progress, setProgress] = useState(value);

	useEffect(() => {
		setProgress(value);
	}, [value]);

	const animatedProps = useAnimatedProps(() => {
		return {
			strokeDashoffset: withTiming(circleLength * progress),
		};
	});

	const sizingHandler = () => {};

	return (
		<View
			className={`rounded-full relative w-[6rem] h-[6rem] items-center justify-center`}
			style={{ backgroundColor: colorVariation[2] }}>
			<Svg
				width={circleLength}
				height={circleLength}>
				<AnimatedCircle
					stroke={colorVariation[1]}
					fill='none'
					cx={circleLength / 2}
					cy={circleLength / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeLinecap={'round'}
				/>
				<AnimatedCircle
					stroke={colorVariation[0]}
					fill='none'
					cx={circleLength / 2}
					cy={circleLength / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeDasharray={circleLength}
					animatedProps={animatedProps}
					strokeLinecap={'round'}
				/>
			</Svg>

			{title ? (
				<Text className='absolute '>{title}</Text>
			) : (
				icon && (
					<View className='absolute'>
						<GenericIcon
							name={icon}
							size={28}
							color='black'
						/>
					</View>
				)
			)}
		</View>
	);
};

export default DashBoardCircle;

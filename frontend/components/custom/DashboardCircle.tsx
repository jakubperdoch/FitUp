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
		<View className='relative w-20 h-20 items-center justify-center'>
			<Svg
				width={circleLength}
				height={circleLength}>
				<Defs>
					<LinearGradient
						id='grad'
						x1='0'
						y1='0'
						x2='1'
						y2='0'>
						<Stop
							offset='0'
							stopColor={colorVariation[0] || '#FE9A05'}
							stopOpacity='1'
						/>
						{colorVariation[1] && (
							<Stop
								offset='1'
								stopColor={colorVariation[1]}
								stopOpacity='1'
							/>
						)}
					</LinearGradient>
				</Defs>
				<AnimatedCircle
					stroke='#F9CD8C'
					fill='none'
					cx={circleLength / 2}
					cy={circleLength / 2}
					r={radius}
					strokeWidth={strokeWidth}
					strokeLinecap={'round'}
				/>
				<AnimatedCircle
					stroke='url(#grad)'
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
				<Text className='absolute '>{size}</Text>
			) : (
				icon && (
					<View className='absolute'>
						<GenericIcon
							name={icon}
							size={32}
							color='black'
						/>
					</View>
				)
			)}
		</View>
	);
};

export default DashBoardCircle;

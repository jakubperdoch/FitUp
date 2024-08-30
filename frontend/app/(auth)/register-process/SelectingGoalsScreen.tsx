import { Text, View, Dimensions, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { interpolate, type AnimatedStyle } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import type { ViewStyle } from 'react-native';

const PAGE_WIDTH = Dimensions.get('window').width;
type TAnimationStyle = (value: number) => AnimatedStyle<ViewStyle>;

const SelectingGoalsScreen = () => {
	const [isFast, setIsFast] = useState(false);
	const [isAutoPlay, setIsAutoPlay] = useState(false);
	const itemSize = 300;
	const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

	const animationStyle: TAnimationStyle = useCallback(
		(value: number) => {
			'worklet';

			const itemGap = interpolate(value, [-1, 0, 1], [-15, 0, 15]);

			const translateX =
				interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
				centerOffset -
				itemGap;

			const translateY = interpolate(value, [-1, 0, 1], [45, 40, 45]);

			const scale = interpolate(value, [-1, 0, 1], [0.85, 1.1, 0.85]);
			const opacity = interpolate(value, [-1, 0, 1], [0.75, 1, 0.75]);

			return {
				transform: [
					{
						translateX,
					} as { translateX: number },
					{
						translateY,
					} as { translateY: number },
					{ scale } as { scale: number },
				],
				opacity,
			};
		},
		[centerOffset]
	);

	return (
		<View className='w-full h-full '>
			<Text>What is your goal ?</Text>
			<Text>It will help us to choose a best program for you</Text>
			<Carousel
				width={itemSize}
				height={itemSize}
				style={{
					width: '100%',
					height: '70%',
					overflow: 'visible',
					alignItems: 'flex-start',
				}}
				data={[...new Array(3).keys()]}
				renderItem={({ index }) => (
					<TouchableWithoutFeedback
						key={index}
						onPress={() => {
							console.log(index);
						}}
						containerStyle={{ flex: 1 }}
						style={{ flex: 1 }}>
						<View
							style={{
								alignItems: 'center',
							}}>
							<Image source={require('@/assets/images/Card-Goals-2.png')} />
						</View>
					</TouchableWithoutFeedback>
				)}
				customAnimation={animationStyle}
			/>
		</View>
	);
};

export default SelectingGoalsScreen;

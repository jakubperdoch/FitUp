import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';

const FooterComponent = () => {
	const insets = useSafeAreaInsets();
	const [selectedIcon, setSelectedIcon] = useState(2);

	const footerItems = [
		{ icon: 'chart-area', position: 0 },
		{ icon: 'cookie', position: 60 },
		{ icon: 'home', position: 110 },
		{ icon: 'dumbbell', position: 160 },
		{ icon: 'user-alt', position: 210 },
	];

	const scaleValues = footerItems.map(() => useSharedValue(1));

	const handlePress = (index: number) => {
		setSelectedIcon(index);
		scaleValues.forEach((scale, i) => {
			scale.value = withSpring(i === index ? 1.4 : 1);
		});
	};

	useEffect(() => {
		scaleValues.forEach((scale, i) => {
			scale.value = withSpring(selectedIcon == i ? 1.4 : 1);
		});
	}, []);

	return (
		<View
			className='bg-[#F7F8F8] pb-11 pt-6 mt-0 rounded-3xl'
			style={{ bottom: -insets.bottom, marginTop: -35 }}>
			<View className='relative flex-row w-full justify-between px-8'>
				{footerItems.map((icon, index) => {
					const animatedStyle = useAnimatedStyle(() => ({
						transform: [{ scale: scaleValues[index].value }],
					}));
					return (
						<Animated.View
							style={[animatedStyle, { zIndex: 10 }]}
							key={index}>
							<TouchableOpacity onPress={() => handlePress(index)}>
								{selectedIcon === index ? (
									<FontAwesome5
										name={icon.icon}
										size={23}
										color='#F77F00'
									/>
								) : (
									<FontAwesome5
										name={icon.icon}
										size={23}
										color='black'
									/>
								)}
							</TouchableOpacity>
						</Animated.View>
					);
				})}
			</View>
		</View>
	);
};

export default FooterComponent;

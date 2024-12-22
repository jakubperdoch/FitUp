import { View, TouchableOpacity } from 'react-native';
import { router, Slot } from 'expo-router';
import GenericIcon from '@/components/custom/Icon';
import { useNavbar } from '@/context/NavbarContaxt';
import { useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

const MealDetailsLayout = () => {
	const { setIsVisible } = useNavbar();

	useEffect(() => {
		setIsVisible(false);
	}, []);

	useFocusEffect(
		useCallback(() => {
			return () => {
				setIsVisible(true);
			};
		}, [])
	);

	return (
		<>
			<View className='flex z-10 flex-row items-center justify-between px-7 pt-4 w-full mb-5'>
				<TouchableOpacity
					className='bg-[#F7F8F8] h-12 w-12 flex items-center justify-center rounded-xl'
					onPress={() => router.back()}>
					<GenericIcon name={'ChevronLeft'} size={28} />
				</TouchableOpacity>

				<TouchableOpacity className='bg-[#F7F8F8] h-12 w-12 flex items-center justify-center rounded-xl'>
					<GenericIcon name={'Ellipsis'} size={28} />
				</TouchableOpacity>
			</View>

			<Slot />
		</>
	);
};

export default MealDetailsLayout;

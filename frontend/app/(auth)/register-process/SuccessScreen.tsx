import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import SuccessImage from '@/assets/images/success-image.svg';
import GradientButtonComponent from '@/components/custom/GradientButton';
import { router } from 'expo-router';

const SuccessScreen = () => {
	const user = useSelector((state: RootState) => state.user);

	const submitHandler = () => {
		router.replace('/home');
	};

	return (
		<View className=' flex flex-col items-center px-7 h-full pt-5'>
			<View className='justify-start items-center h-full w-full'>
				<SuccessImage
					height={'50%'}
					width={350}
				/>
				<Text className='text-3xl mt-12 font-bold font-poppins'>
					Welcome, {user.fullName || 'Friend'}
				</Text>
				<Text className='font-poppins text-[#7B6F72] mt-2 w-2/3 text-center'>
					You are all set now, let’s reach your goals together with us
				</Text>
			</View>

			<GradientButtonComponent
				handleSubmit={submitHandler}
				title={'Go To Home'}
			/>
		</View>
	);
};

export default SuccessScreen;

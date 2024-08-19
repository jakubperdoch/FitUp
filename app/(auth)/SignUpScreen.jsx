import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { Separator } from 'tamagui';
import AppleLoginIcon from '@/assets/icons/apple-login--icon.svg';
import SignUpForm from '@/components/custom/SignUpForm';
import { router } from 'expo-router';
const SignUpScreen = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [checked, setChecked] = useState(false);

	const handleState = () => {
		setShowPassword((showState) => {
			return !showState;
		});
	};

	return (
		<View className='flex flex-col gap-5 justify-center items-center px-5 h-full'>
			<View className='d-flex items-center mb-6 mt-4'>
				<Text className='text-2xl text-primary-500'>Hey there,</Text>
				<Text className='text-3xl font-bold'>Create an Account</Text>
			</View>

			<SignUpForm
				passwordVisibility={showPassword}
				showPasswordHandler={handleState}
			/>

			<View className='flex flex-row max-w-lg justify-center items-center gap-3 mt-5'>
				<BouncyCheckbox
					isChecked={checked}
					fillColor='#F77F00'
					size={25}
					disableText
					className='max-w-8'
					iconStyle={{ borderRadius: 5, borderWidth: 1, borderColor: '#F77F00' }}
					innerIconStyle={{
						borderWidth: 0,
					}}
					onPress={(isChecked) => {
						setChecked(!isChecked);
					}}
				/>
				<Text className='text-gray-500 text-lg font-roboto'>
					I agree to the Terms of Service and Privacy Policy
				</Text>
			</View>

			<TouchableOpacity
				className='w-full mt-auto'
				onPress={() => {
					router.replace('/register-process/InformationsScreen');
				}}>
				<LinearGradient
					start={{ x: 0, y: 0.75 }}
					end={{ x: 1.3, y: 0.25 }}
					colors={['#F77F00', '#D62828']}
					style={{
						height: 70,
						borderRadius: 50,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Text className='text-white text-2xl font-extrabold'>Register</Text>
				</LinearGradient>
			</TouchableOpacity>

			<View className='w-full flex flex-row items-center justify-center gap-2 mt-2'>
				<Separator
					borderColor='#DDDADA'
					borderWidth={1}
				/>
				<Text className='text-lg'>Or</Text>
				<Separator
					borderColor='#DDDADA'
					borderWidth={1}
				/>
			</View>
			<TouchableOpacity>
				<AppleLoginIcon
					width={60}
					height={60}
				/>
			</TouchableOpacity>

			<View className='flex flex-col gap-2 mt-5 items-center justify-center'>
				<Text className='text-xl'>Already have an account?</Text>
				<TouchableOpacity>
					<Text className=' text-xl font-bold text-[#F77F00]'>Sign In</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SignUpScreen;

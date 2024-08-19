import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { Separator } from 'tamagui';

const HomeScreen = () => {
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
			<Input
				paddingHorizontal={10}
				size='xl'
				variant='rounded'>
				<InputSlot>
					<FontAwesome
						name='user-o'
						size={20}
						color='#7B6F72'
					/>
				</InputSlot>
				<InputField
					type={'text'}
					placeholder='Full Name'
					fontFamily='Poppins'
					fontSize={17}
					autoCapitalize='words'
					autoCorrect={false}
				/>
			</Input>

			<Input
				paddingHorizontal={10}
				size='xl'
				variant='rounded'>
				<InputSlot>
					<Feather
						name='mail'
						size={20}
						color='#7B6F72'
					/>
				</InputSlot>
				<InputField
					type={'text'}
					placeholder='Email'
					fontFamily='Poppins'
					color='#7B6F72'
					autoCapitalize='none'
					autoCorrect={false}
				/>
			</Input>

			<Input
				paddingHorizontal={10}
				size='xl'
				variant='rounded'>
				<InputSlot>
					<Feather
						name='lock'
						size={20}
						color='#7B6F72'
					/>
				</InputSlot>
				<InputField
					fontFamily='Poppins'
					placeholder='Password'
					type={showPassword ? 'text' : 'password'}
					fontSize={17}
					autoCorrect={false}
				/>
				<InputSlot
					className='pr-3'
					onPress={handleState}>
					<Feather
						name={showPassword ? 'eye' : 'eye-off'}
						size={22}
						color='#7B6F72'
					/>
				</InputSlot>
			</Input>

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

			<TouchableOpacity className='w-full mt-auto'>
				<LinearGradient
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

			<View className='w-full flex flex-row items-center justify-center gap-2'>
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
		</View>
	);
};

export default HomeScreen;

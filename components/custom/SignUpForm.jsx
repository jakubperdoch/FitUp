import { View } from 'react-native';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

const SignUpForm = ({ passwordVisibility, showPasswordHandler }) => {
	return (
		<View className='w-full gap-5 flex '>
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
					inputMode='email'
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
					type={passwordVisibility ? 'text' : 'password'}
					fontSize={17}
					autoCorrect={false}
				/>
				<InputSlot
					className='pr-3'
					onPress={showPasswordHandler}>
					<Feather
						name={passwordVisibility ? 'eye' : 'eye-off'}
						size={22}
						color='#7B6F72'
					/>
				</InputSlot>
			</Input>
		</View>
	);
};

export default SignUpForm;

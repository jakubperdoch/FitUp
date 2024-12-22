import { View, Text } from 'react-native';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { Controller } from 'react-hook-form';

type SignUpFormProps = {
	passwordVisibility: boolean;
	showPasswordHandler: () => void;
	formType: string;
	control: any;
};

const SignUpForm = ({
	passwordVisibility,
	showPasswordHandler,
	formType,
	control,
}: SignUpFormProps) => {
	return (
		<View className='w-full gap-5 flex '>
			{formType === 'signup' ? (
				<Controller
					control={control}
					rules={{
						required: true,
					}}
					render={({ field: { onChange, value } }) => (
						<Input size='xl' variant='rounded'>
							<InputSlot>
								<FontAwesome name='user-o' size={20} color='#7B6F72' />
							</InputSlot>
							<InputField
								className='text-lg'
								type={'text'}
								value={value}
								onChangeText={onChange}
								placeholder='Full Name'
								autoCapitalize='words'
								autoCorrect={false}
							/>
						</Input>
					)}
					name='name'
				/>
			) : null}

			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, value } }) => (
					<Input size='xl' variant='rounded'>
						<InputSlot>
							<Feather name='mail' size={20} color='#7B6F72' />
						</InputSlot>
						<InputField
							className='text-lg'
							value={value}
							onChangeText={onChange}
							type={'text'}
							inputMode='email'
							placeholder='Email'
							autoCapitalize='none'
							autoCorrect={false}
						/>
					</Input>
				)}
				name='email'
			/>

			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, value } }) => (
					<Input size='xl' variant='rounded'>
						<InputSlot>
							<Feather name='lock' size={20} color='#7B6F72' />
						</InputSlot>
						<InputField
							className='text-lg'
							value={value}
							onChangeText={onChange}
							placeholder='Password'
							type={passwordVisibility ? 'text' : 'password'}
							autoCorrect={false}
						/>
						<InputSlot className='pr-3' onPress={showPasswordHandler}>
							<Feather
								name={passwordVisibility ? 'eye' : 'eye-off'}
								size={22}
								color='#7B6F72'
							/>
						</InputSlot>
					</Input>
				)}
				name='password'
			/>
		</View>
	);
};

export default SignUpForm;

import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButtonComponent = ({ handleSubmit, title }) => {
	return (
		<TouchableOpacity
			className='w-full mt-auto shadow-lg'
			onPress={handleSubmit}>
			<LinearGradient
				start={{ x: 0, y: 0.75 }}
				end={{ x: 1.3, y: 0.25 }}
				colors={['#F77F00', '#D62828']}
				style={{
					height: 60,
					borderRadius: 50,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text className='text-white text-2xl font-extrabold font-poppins'>
					{title}
				</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
};

export default GradientButtonComponent;

import * as Font from 'expo-font';

const isFontLoading = async () => {
	await Font.loadAsync({
		'Poppins--Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
		'Poppins--Light': require('@/assets/fonts/Poppins-Light.ttf'),
		Poppins: require('@/assets/fonts/Poppins-Medium.ttf'),
	});
};

export default isFontLoading;

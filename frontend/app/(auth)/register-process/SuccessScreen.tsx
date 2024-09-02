import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const SuccessScreen = () => {
	const user = useSelector((state: RootState) => state.user);

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<View>
			<Text>Success Screeen</Text>
		</View>
	);
};

export default SuccessScreen;

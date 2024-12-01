import { View, Text, TouchableOpacity } from 'react-native';

type ComponentProps = {
	servingTypes: object[];
	servingAmount: number;
	selectedServingType?: object;
};

const ServingInputComponent = () => {
	return (
		<View>
			<Text>Input</Text>
		</View>
	);
};

export default ServingInputComponent;

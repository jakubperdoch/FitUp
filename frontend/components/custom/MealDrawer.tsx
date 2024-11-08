import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Text } from 'react-native';
import GenericIcon from './Icon';
import ActionSheetComponent from './ActionSheet';
import { useState } from 'react';

const MealDrawerComponent = () => {
	const [showActionsheet, setShowActionsheet] = useState(false);
	const handleClose = () => setShowActionsheet(false);

	return (
		<>
			<TouchableOpacity onPress={() => setShowActionsheet(true)}>
				<LinearGradient
					start={{ x: 0, y: 0.75 }}
					end={{ x: 1.3, y: 0.25 }}
					colors={['#F77F00', '#D62828']}
					style={{
						height: 60,
						width: 60,
						borderRadius: 50,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<GenericIcon name={'Plus'} color='#FFFFFF' size={22} />
				</LinearGradient>
			</TouchableOpacity>

			<ActionSheetComponent
				showActionsheet={showActionsheet}
				closeHandler={handleClose}>
				<Text>Ahooj</Text>
			</ActionSheetComponent>
		</>
	);
};

export default MealDrawerComponent;

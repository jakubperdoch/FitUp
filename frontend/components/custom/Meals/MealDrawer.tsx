import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, Text, View } from 'react-native';
import GenericIcon from '../Icon';
import ActionSheetComponent from '../ActionSheet';
import { useState } from 'react';

type DrawerOption = {
	title: string;
	value: string;
	route: any;
};

type ComponentProps = {
	drawerOptions: Array<DrawerOption>;
	pressHandler: (option) => void;
};

const MealDrawerComponent = ({
	drawerOptions,
	pressHandler,
}: ComponentProps) => {
	const [showActionsheet, setShowActionsheet] = useState(false);
	const handleClose = () => setShowActionsheet(false);

	return (
		<>
			<TouchableOpacity
				onPress={() => setShowActionsheet(true)}
				className='ms-auto me-4 mt-2'>
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
				<View className='w-full my-3'>
					{drawerOptions.map((option, index) => (
						<TouchableOpacity
							onPress={() => pressHandler(option)}
							key={index}
							className='py-4 w-full flex items-center'>
							<Text className='font-poppins'>{option.title}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ActionSheetComponent>
		</>
	);
};

export default MealDrawerComponent;

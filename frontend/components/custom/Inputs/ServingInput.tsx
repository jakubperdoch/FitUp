import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import ActionSheetComponent from '../ActionSheet';
import { SetStateAction, useState, Dispatch } from 'react';

type ServingType = {
	serving_id: string;
	serving_description: string;
	metric_serving_amount: string;
	metric_serving_unit: string;
};

type ComponentProps = {
	servingTypes: ServingType[];
	servingAmount: number;
	selectedServingType: ServingType;
	setSelectedServingType: Dispatch<SetStateAction<object>>;
	setServingAmount: Dispatch<SetStateAction<number>>;
};

const ServingInputComponent = (props: ComponentProps) => {
	const [showActionsheet, setShowActionsheet] = useState(false);
	const handleClose = () => setShowActionsheet(false);

	const modifiedServingUnit = (type: ServingType) =>
		type.serving_description.replace(/\s*\([^)]*\)/g, '');

	return (
		<>
			<View className='flex flex-row items-center h-14'>
				<TextInput
					autoComplete='off'
					autoCorrect={false}
					onChangeText={(text) => {
						const amount = parseFloat(text);
						if (!isNaN(amount)) {
							props.setServingAmount(amount);
						}
					}}
					inputMode='decimal'
					defaultValue='1'
					keyboardType='decimal-pad'
					className=' h-full flex-row items-center rounded-l-xl bg-[#F7F8F8] text-xl px-6 gap-4 font-poppins'
				/>

				<TouchableOpacity
					onPress={() => setShowActionsheet(true)}
					className='h-14 rounded-r-xl bg-[#F7F8F8]  items-center justify-center'>
					<View className='px-5'>
						<Text
							className='text-xl font-poppins truncate  max-w-24'
							numberOfLines={1}>
							{modifiedServingUnit(props.selectedServingType)}
						</Text>
					</View>
				</TouchableOpacity>
			</View>

			<ActionSheetComponent
				showActionsheet={showActionsheet}
				closeHandler={handleClose}>
				<View className='flex flex-col items-center justify-center w-full gap-7 my-5'>
					{props.servingTypes.map((type) => (
						<TouchableOpacity
							key={type.serving_id}
							onPress={() => {
								props.setSelectedServingType(type);
								handleClose();
							}}>
							<Text className='font-poppins text-lg'>{type.serving_description}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ActionSheetComponent>
		</>
	);
};

export default ServingInputComponent;

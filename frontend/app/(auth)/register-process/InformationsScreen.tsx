import { View, Text } from 'react-native';
import InformationSVG from '@/assets/images/informations-image.svg';
import SelectComponent from '@/components/custom/Select';
import DatePickerComponent from '@/components/custom/DatePicker';
import ConversionInputComponent from '@/components/custom/ConversionInput';
import { useState } from 'react';
import { Ruler, Weight } from 'lucide-react-native';

const InformationsScreen = () => {
	const [metric, setMetric] = useState('kg');
	const [weight, setWeight] = useState(null);
	const [height, setHeight] = useState(null);

	return (
		<View className='flex justify-start items-center gap-2 h-full px-5 pt-5'>
			<Text className='self-start text-4xl font-bold'>Track Your Goal</Text>
			<InformationSVG
				height={'40%'}
				width={'100%'}
			/>
			<Text className='text-3xl font-bold mt-2'>Let’s complete your profile</Text>
			<Text className='mt-1 text-[#7B6F72]'>
				It will help us to know more about you!
			</Text>

			<SelectComponent />

			<DatePickerComponent />

			<ConversionInputComponent
				placeholder={'Your Weight'}
				metric={metric}
				inputValue={weight}
				inputChangeHandler={setWeight}
				metricChangeHandler={setMetric}>
				<Weight
					color={'#7B6F72'}
					size={30}
				/>
			</ConversionInputComponent>

			<ConversionInputComponent
				placeholder={'Your Height'}
				metric={metric}
				inputValue={height}
				inputChangeHandler={setHeight}
				metricChangeHandler={setMetric}>
				<Ruler
					color={'#7B6F72'}
					size={30}
				/>
			</ConversionInputComponent>
		</View>
	);
};

export default InformationsScreen;
9;

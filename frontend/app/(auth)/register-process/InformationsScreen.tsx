import { View, Text } from 'react-native';
import InformationSVG from '@/assets/images/informations-image.svg';
import SelectComponent from '@/components/custom/Select';
import DatePickerComponent from '@/components/custom/DatePicker';
import ConversionInputComponent from '@/components/custom/ConversionInput';
import { useState } from 'react';
import { Ruler, Weight } from 'lucide-react-native';
import GradientButtonComponent from '@/components/custom/GradientButton';

const InformationsScreen = () => {
	const [currentWeightIndex, setCurrentWeightIndex] = useState(0);
	const [currentHeightIndex, setCurrentHeightIndex] = useState(0);
	const [weightMetric, setWeightMetric] = useState('kg');
	const [heightMetric, setHeightMetric] = useState('cm');
	const [weight, setWeight] = useState(null);
	const [height, setHeight] = useState(null);

	const weightMetrics = ['kg', 'lb'];
	const heightMetrics = ['cm', 'in'];

	const metricChangeHandler = (
		metricsArray,
		currentIndex,
		setMetric,
		setIndex
	) => {
		const nextIndex =
			currentIndex === metricsArray.length - 1 ? 0 : currentIndex + 1;
		setIndex(nextIndex);
		setMetric(metricsArray[nextIndex]);
	};

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

			<View className='flex flex-col w-full gap-5 mt-5'>
				<SelectComponent />

				<DatePickerComponent />

				<ConversionInputComponent
					placeholder={'Your Weight'}
					metric={weightMetric}
					inputValue={weight}
					inputChangeHandler={setWeight}
					metricChangeHandler={() =>
						metricChangeHandler(
							weightMetrics,
							currentWeightIndex,
							setWeightMetric,
							setCurrentWeightIndex
						)
					}>
					<Weight
						color={'#7B6F72'}
						size={30}
					/>
				</ConversionInputComponent>

				<ConversionInputComponent
					placeholder={'Your Height'}
					metric={heightMetric}
					inputValue={height}
					inputChangeHandler={setHeight}
					metricChangeHandler={() =>
						metricChangeHandler(
							heightMetrics,
							currentHeightIndex,
							setHeightMetric,
							setCurrentHeightIndex
						)
					}>
					<Ruler
						color={'#7B6F72'}
						size={30}
					/>
				</ConversionInputComponent>

				<GradientButtonComponent
					handleSubmit={() => console.log('Routing')}
					title={'Next'}
				/>
			</View>
		</View>
	);
};

export default InformationsScreen;
9;

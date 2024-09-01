import { View, Text, Alert } from 'react-native';
import InformationSVG from '@/assets/images/informations-image.svg';
import SelectComponent from '@/components/custom/Select';
import DatePickerComponent from '@/components/custom/DatePicker';
import ConversionInputComponent from '@/components/custom/ConversionInput';
import { useState } from 'react';
import { Ruler, Weight } from 'lucide-react-native';
import GradientButtonComponent from '@/components/custom/GradientButton';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';

const InformationsScreen = () => {
	const [currentWeightIndex, setCurrentWeightIndex] = useState(0);
	const [currentHeightIndex, setCurrentHeightIndex] = useState(0);
	const [weightMetric, setWeightMetric] = useState('kg');
	const [heightMetric, setHeightMetric] = useState('cm');
	const [weight, setWeight] = useState(null);
	const [height, setHeight] = useState(null);

	const weightMetrics = ['kg', 'lb'];
	const heightMetrics = ['cm', 'in'];

	const genderOptions = [
		{
			label: 'Male',
			value: 'male',
		},
		{
			label: 'Female',
			value: 'female',
		},
		{
			label: 'Other',
			value: 'other',
		},
	];

	const metricChangeHandler = (
		metricsArray: string[],
		currentIndex: number,
		setMetric: (metric: string) => void,
		setIndex: (index: number) => void
	) => {
		const nextIndex =
			currentIndex === metricsArray.length - 1 ? 0 : currentIndex + 1;
		setIndex(nextIndex);
		setMetric(metricsArray[nextIndex]);
	};

	const informationSchema = yup.object().shape({
		gender: yup.string().required('Gender is required'),
		birth: yup.date().required('Date of Birth is required'),
		weight: yup.number().required('Weight is required'),
		height: yup.number().required('Height is required'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(informationSchema),
	});

	const submitHandler = () => {
		console.log('Correct');
		router.push('/register-process/SelectingGoalsScreen');
	};

	const onError = (errors) => {
		let errorMessage = '';

		if (errors.gender) {
			errorMessage += `Gender: ${errors.gender.message}\n`;
		}
		if (errors.birth) {
			errorMessage += `Date of Birth: ${errors.birth.message}\n`;
		}
		if (errors.weight) {
			errorMessage += `Weight: ${errors.weight.message}\n`;
		}
		if (errors.height) {
			errorMessage += `Height: ${errors.height.message}\n`;
		}

		if (errorMessage) {
			Alert.alert('Validation Errors', errorMessage);
		}
	};

	return (
		<View className='flex justify-start items-center gap-2 h-full px-7 pt-5'>
			<Text className='self-start text-4xl font-bold'>Track Your Goal</Text>
			<InformationSVG
				height={'30%'}
				width={'100%'}
			/>
			<Text className='text-3xl font-bold mt-2 font-poppins'>
				Let’s complete your profile
			</Text>
			<Text className='mt-1 font-poppins text-[#7B6F72]'>
				It will help us to know more about you!
			</Text>

			<View className='flex flex-col w-full gap-5 mt-3 mb-2'>
				<SelectComponent
					control={control}
					options={genderOptions}
				/>

				<DatePickerComponent control={control} />

				<ConversionInputComponent
					placeholder={'Your Weight'}
					metric={weightMetric}
					inputValue={weight}
					control={control}
					controlName={'weight'}
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
					control={control}
					controlName={'height'}
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
			</View>
			<GradientButtonComponent
				handleSubmit={handleSubmit(submitHandler, onError)}
				title={'Next'}
			/>
		</View>
	);
};

export default InformationsScreen;
9;

import {
	Select,
	SelectTrigger,
	SelectInput,
	SelectIcon,
	SelectPortal,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicatorWrapper,
	SelectDragIndicator,
	SelectItem,
} from '@/components/ui/select';
import { Controller } from 'react-hook-form';
import { ChevronDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientSelectComponent = ({
	control,
	options,
	placeholder,
	controllerName,
}) => {
	let lastIndexOfArray = options.length - 1;

	const selectElement = (onChange) => (
		<Select
			onValueChange={onChange}
			defaultValue={options[0].value}
			initialLabel={options[0].label}
			className='capitalize '>
			<LinearGradient
				start={{ x: 0, y: 0.75 }}
				end={{ x: 1.3, y: 0.25 }}
				colors={['#F77F00', '#D62828']}
				style={{
					borderRadius: 50,
				}}>
				<SelectTrigger variant='fullRounded' size='md' className='gap-4 '>
					<SelectInput placeholder={placeholder} />
					<SelectIcon className='!h-5 !w-5' color='#FFFFFF' as={ChevronDown} />
				</SelectTrigger>
			</LinearGradient>
			<SelectPortal className='px-5 '>
				<SelectBackdrop />
				<SelectContent>
					<SelectDragIndicatorWrapper>
						<SelectDragIndicator />
					</SelectDragIndicatorWrapper>
					{options.map(
						(anObjectMapped: { name: string; value: string }, index: string) => {
							return (
								<SelectItem
									className={`${index == lastIndexOfArray.toString() ? 'mb-6' : 'mb-0'}`}
									key={index}
									label={anObjectMapped.name}
									value={anObjectMapped.value}
								/>
							);
						}
					)}
				</SelectContent>
			</SelectPortal>
		</Select>
	);

	return control ? (
		<Controller
			control={control}
			rules={{ required: true }}
			render={({ field: { onChange } }) => selectElement(onChange)}
			name={controllerName}
		/>
	) : (
		selectElement(() => {})
	);
};

export default GradientSelectComponent;

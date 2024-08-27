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
import { Users } from 'lucide-react-native';
const SelectComponent = () => {
	const selectHandler = (value) => {
		console.log(value);
	};

	return (
		<Select onValueChange={(value) => selectHandler(value)}>
			<SelectTrigger
				variant='rounded'
				size='xl'>
				<SelectInput placeholder='Choose Gender' />
				<SelectIcon as={Users} />
			</SelectTrigger>
			<SelectPortal className='px-5 '>
				<SelectBackdrop />
				<SelectContent>
					<SelectDragIndicatorWrapper>
						<SelectDragIndicator />
					</SelectDragIndicatorWrapper>
					<SelectItem
						label='UX Research'
						value='ux'
					/>
					<SelectItem
						label='Web Development'
						value='web'
					/>
					<SelectItem
						label='Cross Platform Development Process'
						value='Cross Platform Development Process'
					/>
					<SelectItem
						className='mb-10'
						label='UI Designing'
						value='ui'
					/>
				</SelectContent>
			</SelectPortal>
		</Select>
	);
};

export default SelectComponent;

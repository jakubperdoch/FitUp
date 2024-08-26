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

const SelectComponent = () => {
	return (
		<Select className=''>
			<SelectTrigger
				variant='outline'
				size='md'>
				<SelectInput placeholder='Select option' />
			</SelectTrigger>
			<SelectPortal className='px-5'>
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

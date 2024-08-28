import DatePicker from 'react-native-date-picker';
import { Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import ActionSheetComponent from './ActionSheet';
import { CalendarDays } from 'lucide-react-native';

const DatePickerComponent = () => {
	const [date, setDate] = useState(new Date());
	const [stringDate, setStringDate] = useState('');
	const [minumumDate, setMinimumDate] = useState(null);
	const [showActionsheet, setShowActionsheet] = useState(false);
	const handleClose = () => setShowActionsheet(false);

	useEffect(() => {
		if (date && showActionsheet) {
			setStringDate(date.toLocaleDateString('en-US'));
			setMinimumDate(
				new Date(new Date().setFullYear(new Date().getFullYear() - 10))
			);
		}
	}, [date]);

	return (
		<>
			<TouchableOpacity
				onPress={() => setShowActionsheet(true)}
				className='px-6 gap-4 rounded-xl bg-[#F7F8F8] flex flex-row h-16 items-center justify-start w-full'>
				<CalendarDays
					color={'#7B6F72'}
					size={30}
				/>
				<Text
					className={`${
						stringDate ? 'opacity-100' : 'opacity-40'
					} font-semibold font-poppins text-xl text-[#7B6F72]`}>
					{stringDate ? stringDate : 'Date of Birth'}
				</Text>
			</TouchableOpacity>

			<ActionSheetComponent
				showActionsheet={showActionsheet}
				closeHandler={handleClose}>
				<DatePicker
					date={date}
					mode='date'
					onDateChange={setDate}
					maximumDate={minumumDate}
				/>
			</ActionSheetComponent>
		</>
	);
};

export default DatePickerComponent;

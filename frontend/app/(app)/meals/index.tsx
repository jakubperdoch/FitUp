// here user will have see all entered meals in specific day
import { ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import DatePanelComponent from '@/components/custom/DatePanel';

const MealsPage = () => {
	const [dates, setDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [index, setIndex] = useState(3);

	return (
		<ScrollView>
			<DatePanelComponent
				dates={dates}
				selectedDate={selectedDate}
				index={index}
				setDates={setDates}
				setSelectedDate={setSelectedDate}
				setIndex={setIndex}
			/>
		</ScrollView>
	);
};

export default MealsPage;

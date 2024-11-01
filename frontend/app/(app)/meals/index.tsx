// here user will have see all entered meals in specific day
import {
	ScrollView,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import DateCardComponent from '@/components/custom/DateCard';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import GenericIcon from '@/components/custom/Icon';

const MealsPage = () => {
	const [dates, setDates] = useState([]);
	const [months, setMonths] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currentDate, setCurrentDate] = useState(null);
	const [index, setIndex] = useState(3);
	const [loading, setLoading] = useState(true);

	const date = new Date();

	const getDatesInMonth = (year: number, month: number) => {
		const datesArray = [];
		let date = new Date(year, month - 1, 1);

		while (date.getMonth() === month - 1) {
			const localDate = new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				0,
				0,
				0
			);

			datesArray.push({
				day: localDate.toLocaleString('default', { weekday: 'short' }),
				date: localDate,
			});

			date.setDate(date.getDate() + 1);
		}

		setDates(datesArray);
		setLoading(false);
	};

	const getMonths = () => {
		const monthsArray = [];
		const baseMonth = new Date().getMonth() - 3;

		for (let i = 0; i < 5; i++) {
			const monthDate = new Date();
			monthDate.setMonth(baseMonth + i);

			monthsArray.push({
				month: monthDate.toLocaleString('default', { month: 'long' }),
				year: monthDate.getFullYear(),
			});
		}

		setMonths(monthsArray);
	};

	const selectDateHandler = (date: Date) => {
		setSelectedDate(date);
	};

	const dateChangeHandler = (direction: number) => {
		if (index + direction >= 0 && index + direction <= 4) {
			setIndex((prev) => prev + direction);
			setCurrentDate(`${months[index].month} ${months[index].year}`);
			getDatesInMonth(months[index].year, date.getMonth() + index);
		}
	};

	useEffect(() => {
		getDatesInMonth(date.getFullYear(), date.getMonth() + 1);
		getMonths();
	}, []);

	useEffect(() => {
		if (months.length > 0) {
			setCurrentDate(`${months[index].month} ${months[index].year}`);
		}
	}, [months]);

	const ITEM_WIDTH = 80;

	return (
		<ScrollView>
			{loading ? (
				<View>
					<Spinner
						size='small'
						color={'#F77F00'}
					/>
					<Text>Loading...</Text>
				</View>
			) : (
				<>
					<View className='flex flex-row items-center mx-auto justify-between w-64  my-2'>
						<TouchableOpacity onPress={() => dateChangeHandler(-1)}>
							<GenericIcon
								name={'ChevronLeft'}
								color='#ADA4A5'
							/>
						</TouchableOpacity>
						<Text className='text-center text-[#ADA4A5] text-2xl'>{currentDate}</Text>
						<TouchableOpacity onPress={() => dateChangeHandler(1)}>
							<GenericIcon
								name={'ChevronRight'}
								color='#ADA4A5'
							/>
						</TouchableOpacity>
					</View>

					<FlatList
						data={dates}
						renderItem={({ item }) => (
							<DateCardComponent
								day={item.day}
								date={item.date}
								selectedDate={selectedDate}
								selectionHandler={selectDateHandler}
							/>
						)}
						keyExtractor={(item) => item.date.toISOString()}
						horizontal
						className='w-full mt-5 '
						initialScrollIndex={dates.findIndex(
							(date) => date.date.getDate() === new Date().getDate()
						)}
						getItemLayout={(data, index) => ({
							length: ITEM_WIDTH,
							offset: ITEM_WIDTH * index,
							index,
						})}
						showsHorizontalScrollIndicator={false}
					/>
				</>
			)}
		</ScrollView>
	);
};

export default MealsPage;

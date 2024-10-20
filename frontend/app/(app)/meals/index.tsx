// here user will have see all entered meals in specific day
import { ScrollView, Text, View, FlatList } from 'react-native';
import DateCardComponent from '@/components/custom/DateCard';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { set } from 'react-hook-form';

const MealsPage = () => {
	const [dates, setDates] = useState([]);
	const [months, setMonths] = useState([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [loading, setLoading] = useState(true);

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
		const date = new Date().getMonth() - 3;

		for (let i = 0; i < 5; i++) {
			const month = new Date(new Date().setMonth(date + i));

			monthsArray.push({
				month: month.toLocaleString('default', { month: 'long' }),
				year: month.getFullYear(),
			});
		}

		setMonths(monthsArray);
		console.log(monthsArray);
	};

	const selectDateHandler = (date: Date) => {
		setSelectedDate(date);
		console.log(date.getMonth());
		console.log(selectedDate.getMonth());
	};

	const getCurrentMonth = () => {
		const month = months.find(
			(month) =>
				month.month === selectedDate.toLocaleString('default', { month: 'long' })
		).month;

		const year = selectedDate.getFullYear();

		return `${month} ${year}`;
	};

	useEffect(() => {
		const year = new Date().getFullYear();
		const month = new Date().getMonth() + 1;
		getDatesInMonth(year, month);
		getMonths();
	}, []);

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
					<Text className='text-center text-[#ADA4A5] text-2xl mt-2'>
						{getCurrentMonth()}
					</Text>
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
						initialScrollIndex={
							dates.findIndex((date) => date.date.getDate() === new Date().getDate()) -
							1
						}
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

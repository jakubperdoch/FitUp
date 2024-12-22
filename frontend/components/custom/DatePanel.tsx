import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import GenericIcon from '@/components/custom/Icon';
import DateCardComponent from '@/components/custom/Button/DateCard';
import { Spinner } from '../ui/spinner';

type DateType = {
	day: string;
	date: Date;
};

type MonthType = {
	month: string;
	year: number;
	digitalMonth: number;
};

type ComponentProps = {
	dates: Array<DateType>;
	selectedDate: Date;
	index: number;

	setSelectedDate: (date: Date) => void;
	setIndex: (prev: any) => void;
	setDates: (dates: Array<DateType>) => void;
};

const DatePanelComponent = (props: ComponentProps) => {
	const [months, setMonths] = useState<MonthType[]>([]);
	const [currentDate, setCurrentDate] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(true);

	const ITEM_WIDTH = 89.5;
	const date = new Date();

	const getDatesInMonth = (year: number, month: number) => {
		const datesArray = [];

		let date = new Date(year, month - 1, 1);

		while (date.getMonth() === month - 1) {
			if (!month) {
				console.log('problem s mesiacom');
			}
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

		props.setDates(datesArray);
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
				digitalMonth: monthDate.getMonth() + 1,
			});
		}

		setMonths(monthsArray);
	};

	const selectDateHandler = (date: Date) => {
		props.setSelectedDate(date);
	};

	const dateChangeHandler = (direction: number) => {
		const newIndex = props.index + direction;

		if (newIndex >= 0 && newIndex < months.length) {
			props.setIndex(newIndex);

			setCurrentDate(`${months[newIndex].month} ${months[newIndex].year}`);
			getDatesInMonth(months[newIndex].year, months[newIndex].digitalMonth);
		}
	};

	useEffect(() => {
		getDatesInMonth(date.getFullYear(), date.getMonth() + 1);
		getMonths();
	}, []);

	useEffect(() => {
		if (months.length > 0) {
			setCurrentDate(`${months[props.index].month} ${months[props.index].year}`);
		}
	}, [months, props.index]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<View className='flex flex-row items-center mx-auto justify-between w-64  my-2'>
						<TouchableOpacity onPress={() => dateChangeHandler(-1)}>
							<GenericIcon name={'ChevronLeft'} color='#ADA4A5' />
						</TouchableOpacity>
						<Text className='text-center text-[#ADA4A5] text-2xl'>
							{currentDate || ''}
						</Text>
						<TouchableOpacity onPress={() => dateChangeHandler(+1)}>
							<GenericIcon name={'ChevronRight'} color='#ADA4A5' />
						</TouchableOpacity>
					</View>
					<FlatList
						data={props.dates}
						renderItem={({ item }) => (
							<DateCardComponent
								day={item.day}
								date={item.date}
								selectedDate={props.selectedDate}
								selectionHandler={selectDateHandler}
							/>
						)}
						keyExtractor={(item) => item.date.toISOString()}
						horizontal
						className='w-full mt-5 mb-8'
						initialScrollIndex={
							props.dates.length > 0
								? Math.max(
										0,
										Math.min(
											props.dates.findIndex(
												(date) => date.date.getDate() === new Date().getDate()
											),
											props.dates.length - 1
										)
									)
								: 0
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
		</>
	);
};

export default DatePanelComponent;

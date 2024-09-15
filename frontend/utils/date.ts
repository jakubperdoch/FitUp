const useCurrentDateHandler = () => {
	const now = new Date();
	let currentDate: {
		date;
		time;
	};
	const formattedTime =
		now.getHours().toString().padStart(2, '0') +
		':' +
		now.getMinutes().toString().padStart(2, '0');

	const formattedDate = now.toLocaleDateString();

	currentDate = {
		date: formattedDate,
		time: formattedTime,
	};
	return { currentDate, formattedDate, formattedTime };
};

export default useCurrentDateHandler;

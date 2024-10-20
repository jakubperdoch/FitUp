import { usePathname } from 'expo-router';

const pathNameHandler = () => {
	const path = usePathname();
	let customPath = null;
	const customPaths = [
		{ path: '/home', label: 'Fit Up' },
		{ path: '/workouts', label: 'Workout Tracker' },
		{ path: '/meals', label: 'Meal Plan' },
	];

	for (const route of customPaths) {
		if (route.path === path) {
			customPath = route.label;
			break;
		}
	}

	return customPath;
};

export default pathNameHandler;

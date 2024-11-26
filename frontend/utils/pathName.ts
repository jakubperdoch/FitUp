import { usePathname } from 'expo-router';

const pathNameHandler = () => {
	const path = usePathname();
	let customPath = null;
	let excludePath = null;

	const labelPaths = [
		{ path: '/home', label: 'Fit Up' },
		{ path: '/workouts', label: 'Workout Tracker' },
		{ path: '/meals', label: 'Meal Plan' },
		{ path: '/profile', label: 'Profile' },
		{ path: '/chart', label: 'Chart' },
	];

	const excludePaths = [
		{
			label: 'Workout Details',
			path: '/meals/details',
		},
	];

	for (const route of labelPaths) {
		if (route.path === path) {
			customPath = {
				label: route.label,
			};
			break;
		}
	}

	for (const route of excludePaths) {
		if (path.includes(route.path)) {
			excludePath = {
				label: route.label,
				visibile: false,
			};
			break;
		}
	}

	if (customPath) {
		return customPath;
	} else if (excludePath) {
		return excludePath;
	} else {
		return null;
	}
};

export default pathNameHandler;

import { usePathname } from 'expo-router';

const pathNameHandler = () => {
	const path = usePathname();
	let customPath = null;

	const labelPaths = [
		{ path: '/home', label: 'Fit Up', visible: true },
		{ path: '/workouts', label: 'Workout Tracker', visible: true },
		{ path: '/meals', label: 'Meal Plan', visible: true },
		{ path: '/profile', label: 'Profile', visible: true },
		{ path: '/chart', label: 'Chart', visible: true },
		{ path: '/meals/details/', label: 'Meal Details', visible: false },
	];

	for (const route of labelPaths) {
		if (route.path === path) {
			customPath = {
				label: route.label,
				return: false,
			};
			break;
		}
	}

	return customPath;
};

export default pathNameHandler;

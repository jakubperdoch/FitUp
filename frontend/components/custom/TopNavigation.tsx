import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';
import pathNameHandler from '@/utils/pathName';

const TopNavigationComponent = () => {
	const pathname = usePathname();
	const [pathName, setPathName] = useState('');
	const customPath = pathNameHandler();

	useEffect(() => {
		setPathName(customPath);
		console.log(customPath);
	}, [pathname]);

	return (
		<View className='flex flex-row items-center justify-center px-7 pt-4 w-full mb-5'>
			<Text className='text-2xl font-poppinsBold'>{pathName}</Text>
		</View>
	);
};

export default TopNavigationComponent;

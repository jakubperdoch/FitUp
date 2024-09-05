import { Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';
import pathNameHandler from '@/utils/pathName';
import { ChevronLeft } from 'lucide-react-native';

const TopNavigationComponent = () => {
	const pathname = usePathname();
	const [pathName, setPathName] = useState('');
	const customPath = pathNameHandler();

	useEffect(() => {
		setPathName(customPath);
		console.log(customPath);
	}, [pathname]);

	return (
		<View className='flex flex-row items-center justify-between px-7 w-full mb-5'>
			<TouchableOpacity className='p-3 bg-[#f7f8f7] rounded-2xl'>
				<ChevronLeft color='#1D1617' />
			</TouchableOpacity>

			<Text className='text-2xl font-poppinsBold'>{pathName}</Text>

			<View className='p-3'>
				<ChevronLeft
					color='#1D1617'
					strokeWidth={0}
				/>
			</View>
		</View>
	);
};

export default TopNavigationComponent;

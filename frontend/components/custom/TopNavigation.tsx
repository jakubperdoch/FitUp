import { Text, View, TouchableOpacity } from 'react-native';

import { router } from 'expo-router';
import GenericIcon from '@/components/custom/Icon';

type ComponentProps = {
	title?: string;
	isBackButton?: boolean;
	isDetailsButton?: boolean;
	isVisible?: boolean;
};

const TopNavigationComponent = ({
	title,
	isBackButton,
	isDetailsButton,
	isVisible,
}: ComponentProps) => {
	return (
		<>
			{isVisible && (
				<View className='flex flex-row items-center justify-center px-7 pt-4 w-full mb-5'>
					{isBackButton ? (
						<TouchableOpacity
							className='bg-[#F7F8F8] h-12 w-12 flex items-center justify-center rounded-xl'
							onPress={() => router.back()}>
							<GenericIcon name={'ChevronLeft'} size={28} />
						</TouchableOpacity>
					) : null}

					<Text className='text-2xl font-poppinsBold'>
						{title ? title : 'Title'}
					</Text>

					{isDetailsButton ? (
						<TouchableOpacity className='bg-[#F7F8F8] h-12 w-12 flex items-center justify-center rounded-xl'>
							<GenericIcon name={'Ellipsis'} size={28} />
						</TouchableOpacity>
					) : null}
				</View>
			)}
		</>
	);
};

export default TopNavigationComponent;

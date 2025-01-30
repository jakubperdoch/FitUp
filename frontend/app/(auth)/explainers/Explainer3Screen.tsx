import { useEffect } from 'react';
import { useExplainer } from '@/context/ExplainerContext';
import ExplainerImage from '@/assets/images/explainers-second.svg';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExplainerPageThree = () => {
	const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
		useExplainer();
	const insets = useSafeAreaInsets();
	useEffect(() => {
		setExplainerTitle('Get Burn');
		setExplainerDescription(
			'Let’s keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever'
		);
	}, [setExplainerTitle, setExplainerDescription, setExplainerImage]);

	return (
		<>
			<ExplainerImage
				width='100%'
				height='90%'
				style={{ top: -insets.top }}
			/>
		</>
	);
};

const styles = StyleSheet.create({});

export default ExplainerPageThree;

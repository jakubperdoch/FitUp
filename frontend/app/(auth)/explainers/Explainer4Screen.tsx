import { useEffect } from 'react';
import { useExplainer } from '@/context/ExplainerContext';
import ExplainerImage from '@/assets/images/explainers-fourth.svg';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExplainerPageFour = () => {
	const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
		useExplainer();
	const insets = useSafeAreaInsets();
	useEffect(() => {
		setExplainerTitle('Improve Sleep  Quality');
		setExplainerDescription(
			'Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning'
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

export default ExplainerPageFour;

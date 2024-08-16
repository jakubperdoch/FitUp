import { useEffect } from 'react';
import { useExplainer } from '@/context/ExplainerContext';
import ExplainerImage from '@/assets/images/explainers-first.svg';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExplainerPageOne = () => {
	const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
		useExplainer();
	const insets = useSafeAreaInsets();
	useEffect(() => {
		setExplainerTitle('Track Your Goal');
		setExplainerDescription(
			"Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals"
		);
	}, [setExplainerTitle, setExplainerDescription, setExplainerImage]);

	return (
		<>
			<ExplainerImage
				width='100%'
				height='100%'
				style={[styles.imageContainer, { top: -insets.top }]}
			/>
		</>
	);
};

const styles = StyleSheet.create({});

export default ExplainerPageOne;

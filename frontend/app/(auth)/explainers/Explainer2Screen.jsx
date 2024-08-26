import { useEffect } from 'react';
import { useExplainer } from '@/context/ExplainerContext';
import ExplainerImage from '@/assets/images/explainers-third.svg';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExplainerPageTwo = () => {
	const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
		useExplainer();
	const insets = useSafeAreaInsets();
	useEffect(() => {
		setExplainerTitle('Eat Well');
		setExplainerDescription(
			"Let's start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun"
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

export default ExplainerPageTwo;

import { router, Slot } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressButton from '@/components/custom/ProgressButton';
import { useExplainer } from '@/context/ExplainerContext';
import { usePathname } from 'expo-router';

const ExplainersLayout = () => {
	const [progressBar, setProgress] = useState(-0.75);
	const [pageIndex, setIndex] = useState(1);
	const { explainerDescription, explainerTitle } = useExplainer();
	const pathname = usePathname();

	const onPressHandler = () => {
		if (pageIndex >= 4) {
			router.replace('/SignUpScreen');
			return;
		}
		setProgress((prevProgress) => prevProgress + 0.25);
		setIndex((prevIndex) => prevIndex + 1);
		router.replace(`/explainers/Explainer${pageIndex + 1}Screen`);
	};

	return (
		<View style={styles.explainersLayout}>
			<View style={styles.explainersImage}>
				<Slot />
			</View>
			<View style={styles.contentContainer}>
				<Text
					style={styles.explainersTitle}
					className='font-poppins'>
					{explainerTitle}
				</Text>
				<Text
					style={styles.explainersDesc}
					className='font-poppinsLight'>
					{explainerDescription}
				</Text>
				<ProgressButton
					progress={progressBar}
					onPressHandler={onPressHandler}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	explainersLayout: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: 30,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		height: '37%',
	},
	explainersImage: {
		width: '100%',
		height: '65%',
		marginTop: -20,
	},
	explainersTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	explainersDesc: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: 'left',
		width: 320,
	},
});

export default ExplainersLayout;

import { useEffect } from 'react';
import { useExplainer } from '@/context/ExplainerContext';
import ExplainerImage from '@/assets/images/explainers-one.svg';

const ExplainerPageOne = () => {
	const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
		useExplainer();

	useEffect(() => {
		setExplainerTitle('Track Your Goal');
		setExplainerDescription(
			"Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals"
		);
	}, [setExplainerTitle, setExplainerDescription, setExplainerImage]);

	return <ExplainerImage />;
};

export default ExplainerPageOne;

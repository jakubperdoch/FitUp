import { useEffect } from 'react';
import { useExplainer } from '@/context/ExplainerContext';

const ExplainerPageOne = () => {
 const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
  useExplainer();

 useEffect(() => {
  setExplainerTitle('Track Your Goal');
  setExplainerDescription(
   "Don't worry if you have trouble determining your goals, We can help you determine your goals and track your goals"
  );
 }, [setExplainerTitle, setExplainerDescription, setExplainerImage]);

 return null;
};

export default ExplainerPageOne;

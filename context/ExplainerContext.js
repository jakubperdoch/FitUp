import { createContext, useContext } from 'react';
import { useState } from 'react';

const ExplainerContext = createContext(null);

export const ExplainerProvider = ({ children }) => {
 const [explainerTitle, setExplainerTitle] = useState('');
 const [explainerDescription, setExplainerDescription] = useState('');
 const [explainerImage, setExplainerImage] = useState('');

 return (
  <ExplainerContext.Provider
   value={{
    explainerTitle,
    setExplainerTitle,
    explainerDescription,
    setExplainerDescription,
    explainerImage,
    setExplainerImage,
   }}
  >
   {children}
  </ExplainerContext.Provider>
 );
};

export const useExplainer = () => useContext(ExplainerContext);

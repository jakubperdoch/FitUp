import { Slot } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ProgressButton from '@/components/custom/ProgressButton';
import { useExplainer } from '@/context/ExplainerContext';

const ExplainersLayout = () => {
 const [progressBar, setProgress] = useState(-0.7);
 const { explainerImage, explainerDescription, explainerTitle } =
  useExplainer();
 return (
  <View style={styles.explainersLayout}>
   <View style={styles.explainersImage}>
    <Image source={explainerImage} />
   </View>
   <Text style={styles.explainersTitle}>{explainerTitle}</Text>
   <Text style={styles.explainersDesc}>{explainerDescription}</Text>

   <Slot />

   <ProgressButton progress={progressBar} />
  </View>
 );
};

const styles = StyleSheet.create({
 explainersLayout: {},

 explainersImage: {},
 explainersTitle: {},
 explainersDesc: {},

 explainersButton: {},
});

export default ExplainersLayout;

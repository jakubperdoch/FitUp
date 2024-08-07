import { Slot } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressButton from '@/components/custom/ProgressButton';
import { useExplainer } from '@/context/ExplainerContext';

const ExplainersLayout = () => {
 const [progressBar, setProgress] = useState(-0.7);
 const {
  explainerImage: ExplainerComponent,
  explainerDescription,
  explainerTitle,
 } = useExplainer();

 return (
  <View style={styles.explainersLayout}>
   <View style={styles.explainersImage}>
    <Slot />
   </View>
   <Text style={styles.explainersTitle}>{explainerTitle}</Text>
   <Text style={styles.explainersDesc}>{explainerDescription}</Text>
   <ProgressButton progress={progressBar} />
  </View>
 );
};

const styles = StyleSheet.create({
 explainersLayout: {
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
 },
 explainersImage: {
  marginBottom: 20,
  alignItems: 'center',
 },
 explainersTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
 },
 explainersDesc: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
 },
});

export default ExplainersLayout;

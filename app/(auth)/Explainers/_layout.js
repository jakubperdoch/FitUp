import { Slot } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressButton from '@/components/custom/ProgressButton';
const ExplainersLayout = ({ image, title, description }) => {
 const [progressBar, setProgress] = useState(0);

 return (
  <View style={styles.explainersLayout}>
   <View style={styles.explainersImage}>{image}</View>
   <Text style={styles.explainersTitle}>{title}</Text>
   <Text style={styles.explainersDesc}>{description}</Text>

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

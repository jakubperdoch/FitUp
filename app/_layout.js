import { StatusBar } from 'expo-status-bar';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { StyleSheet, Text, View } from 'react-native';
import { ExpoRouter, Slot, Stack } from 'expo-router';

const RootLayout = () => {
 return (
  <GluestackUIProvider mode="light">
   <View style={styles.container}>
    <Slot />
   </View>
  </GluestackUIProvider>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
});

export default RootLayout;

import { StatusBar } from 'expo-status-bar';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { StyleSheet, Text, View } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context/AuthContext';

const RootLayout = () => {
 return (
  <SafeAreaProvider>
   <GluestackUIProvider mode="light">
    <SafeAreaView style={styles.container}>
     <AuthProvider>
      <Slot />
     </AuthProvider>
    </SafeAreaView>
   </GluestackUIProvider>
  </SafeAreaProvider>
 );
};

const styles = StyleSheet.create({
 container: { flex: 1 },
});

export default RootLayout;

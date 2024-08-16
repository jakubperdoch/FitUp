import { StatusBar } from 'expo-status-bar';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ContextProvider } from '@/context/context';

const RootLayout = () => {
	return (
		<SafeAreaProvider>
			<GluestackUIProvider mode='light'>
				<SafeAreaView style={styles.container}>
					<ContextProvider>
						<Slot />
					</ContextProvider>
				</SafeAreaView>
			</GluestackUIProvider>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, height: '100%' },
});

export default RootLayout;

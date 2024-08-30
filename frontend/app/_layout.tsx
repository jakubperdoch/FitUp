import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@/global.css';
import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ContextProvider } from '@/context/Context';
import { TamaguiProvider } from '@tamagui/core';
import config from '@/tamagui.config';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { PortalProvider } from 'tamagui';

const RootLayout = () => {
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<GluestackUIProvider>
					<TamaguiProvider config={config}>
						<PortalProvider>
							<SafeAreaView style={styles.container}>
								<ContextProvider>
									<Slot />
									<Toast />
								</ContextProvider>
							</SafeAreaView>
						</PortalProvider>
					</TamaguiProvider>
				</GluestackUIProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, height: '100%' },
});

export default RootLayout;

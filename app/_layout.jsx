import '@/global.css';
import { StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ContextProvider } from '@/context/context';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import config from '@/tamagui.config';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const tamaguiConfig = createTamagui(config);

const RootLayout = () => {
	return (
		<SafeAreaProvider>
			<TamaguiProvider config={tamaguiConfig}>
				<SafeAreaView style={styles.container}>
					<ContextProvider>
						<Slot />
						<Toast />
					</ContextProvider>
				</SafeAreaView>
			</TamaguiProvider>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, height: '100%' },
});

export default RootLayout;

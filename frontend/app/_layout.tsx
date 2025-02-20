import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import "../global.css";
import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ContextProvider } from "@/context/Context";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/lang/i18n";
const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <SafeAreaView style={styles.container}>
                <ContextProvider>
                  <Slot />
                  <Toast />
                </ContextProvider>
              </SafeAreaView>
            </Provider>
          </QueryClientProvider>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, height: "100%", backgroundColor: "#FFFFFF" },
});

export default RootLayout;

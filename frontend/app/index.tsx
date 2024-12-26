import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import isFontLoading from "@/constants/fonts";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const RootPage = () => {
  const logoAnimation = useRef(null);
  const { userToken, logIn, logOut } = useAuth();

  useEffect(() => {
    const isDataLoading = async () => {
      try {
        await userToken;
        await isFontLoading();
      } catch (e) {
        console.log(e);
      } finally {
        logoAnimation.current?.play();
      }
    };
    isDataLoading();
  }, []);

  return (
    <View style={styles.splashScreen}>
      <LottieView
        ref={logoAnimation}
        loop={false}
        style={styles.lottieView}
        onAnimationFinish={() => {
          setTimeout(() => {
            router.replace(
              userToken ? "/home" : "/explainers/Explainer1Screen",
            );
          }, 200);
        }}
        source={require("@/assets/animations/logo_animation.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottieView: {
    width: "100%",
    height: "40%",
  },
});

export default RootPage;

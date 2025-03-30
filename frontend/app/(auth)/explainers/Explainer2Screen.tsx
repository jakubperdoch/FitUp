import { useEffect } from "react";
import { useExplainer } from "@/context/ExplainerContext";
import { Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ExplainerPageTwo = () => {
  const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
    useExplainer();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setExplainerTitle("Eat Well");
    setExplainerDescription(
      "Let's start a healthy lifestyle with us, we can determine your diet every day. healthy eating is fun",
    );
  }, [setExplainerTitle, setExplainerDescription, setExplainerImage]);

  return (
    <>
      <Image
        className="h-full w-full"
        source={require("@/assets/images/explainers-second.png")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ExplainerPageTwo;

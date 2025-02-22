import { useEffect } from "react";
import { useExplainer } from "@/context/ExplainerContext";
import ExplainerImage from "@/assets/images/explainers-second.svg";
import { Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ExplainerPageThree = () => {
  const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
    useExplainer();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setExplainerTitle("Get Burn");
    setExplainerDescription(
      "Let’s keep burning, to achive yours goals, it hurts only temporarily, if you give up now you will be in pain forever",
    );
  }, [setExplainerTitle, setExplainerDescription, setExplainerImage]);

  return (
    <>
      <Image
        className="h-full w-full"
        source={require("@/assets/images/explainers-third.png")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ExplainerPageThree;

import { useEffect } from "react";
import { useExplainer } from "@/context/ExplainerContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";

const ExplainerPageFour = () => {
  const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
    useExplainer();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setExplainerTitle("Improve Sleep  Quality");
    setExplainerDescription(
      "Improve the quality of your sleep with us, good quality sleep can bring a good mood in the morning",
    );
  }, [setExplainerTitle, setExplainerDescription, setExplainerImage]);

  return (
    <>
      <Image
        className="h-full w-full"
        source={require("@/assets/images/explainers-fourth.png")}
      />
    </>
  );
};

export default ExplainerPageFour;

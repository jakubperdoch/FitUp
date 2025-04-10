import { useEffect } from "react";
import { useExplainer } from "@/context/ExplainerContext";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";

const ExplainerPageFour = () => {
  const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
    useExplainer();
  const { t } = useTranslation("onboarding");

  useEffect(() => {
    setExplainerTitle(t("explainers4.title"));
    setExplainerDescription(t("explainers4.text"));
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

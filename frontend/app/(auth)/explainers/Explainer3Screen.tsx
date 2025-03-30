import { useEffect } from "react";
import { useExplainer } from "@/context/ExplainerContext";
import { Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const ExplainerPageThree = () => {
  const { setExplainerTitle, setExplainerDescription, setExplainerImage } =
    useExplainer();
  const { t } = useTranslation("onboarding");

  useEffect(() => {
    setExplainerTitle(t("explainers2.title"));
    setExplainerDescription(t("explainers2.text"));
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

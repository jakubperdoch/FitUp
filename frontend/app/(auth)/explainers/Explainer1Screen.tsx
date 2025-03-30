import { useEffect } from "react";
import { useExplainer } from "@/context/ExplainerContext";
import { Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const ExplainerPageOne = () => {
  const { setExplainerTitle, setExplainerDescription } = useExplainer();
  const { t } = useTranslation("onboarding");

  useEffect(() => {
    setExplainerTitle(t("explainers1.title"));
    setExplainerDescription(t("explainers1.text"));
  }, [setExplainerTitle, setExplainerDescription]);

  return (
    <Image
      className="h-full w-full"
      source={require("@/assets/images/explainers-first.png")}
    />
  );
};

const styles = StyleSheet.create({});

export default ExplainerPageOne;

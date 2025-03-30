import { Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const LanguageButton = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { i18n } = useTranslation();

  useEffect(() => {
    const getCurrentLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("selectedLanguage");
        if (value !== null) {
          setSelectedLanguage(value);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getCurrentLanguage();
  }, []);

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      await AsyncStorage.setItem("selectedLanguage", language);
      setSelectedLanguage(language);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        const newLanguage = selectedLanguage === "en" ? "sk" : "en";
        changeLanguage(newLanguage);
      }}
    >
      {selectedLanguage === "en" ? (
        <Image
          source={require("@/assets/icons/england-flag--icon.png")}
          className="h-9 w-9 me-2"
        />
      ) : (
        <Image
          source={require("@/assets/icons/slovak-flag--icon.png")}
          className="h-9 w-9 me-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default LanguageButton;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/index";
import sk from "./sk/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const chosenLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem("selectedLanguage");
    if (value !== null) {
      i18n.changeLanguage(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getCurrentLanguage = async () => {
  try {
    const value = await AsyncStorage.getItem("selectedLanguage");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

const resources = {
  en,
  sk,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
} as any);

export default { i18n };

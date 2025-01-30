import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from "@/components/ui/radio";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CircleIcon } from "lucide-react-native";
import { useFocusEffect } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguagesScreen = () => {
  const { setNavbarTitle, setShowBackButton } = useLayout();

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const setLanguage = async (language: string) => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem("language", language);
  };

  useEffect(() => {
    setNavbarTitle("Languages");
    setShowBackButton(true);

    const fetchLanguage = async () => {
      const language = await AsyncStorage.getItem("language");
      setSelectedLanguage(language || "en");
    };

    fetchLanguage().catch(console.error);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  return (
    <View className="px-7 gap-7 mt-5">
      <View className="gap-1">
        <Text className="font-poppinsSemiBold text-xl">
          Select your preferred language
        </Text>
        <Text className="text-[#6B7280] font-poppins text-sm">
          This will change the language of the app
        </Text>
      </View>

      <RadioGroup
        value={selectedLanguage}
        onChange={(value) => setLanguage(value)}
        className="gap-3"
      >
        <Radio value="en" size={"lg"}>
          <RadioIndicator>
            <RadioIcon as={CircleIcon} color={"black"} fill={"black"} />
          </RadioIndicator>
          <RadioLabel>English</RadioLabel>
        </Radio>
        <Radio value="sk" size={"lg"}>
          <RadioIndicator>
            <RadioIcon as={CircleIcon} color={"black"} fill={"black"} />
          </RadioIndicator>
          <RadioLabel>Slovak</RadioLabel>
        </Radio>
      </RadioGroup>
    </View>
  );
};

export default LanguagesScreen;

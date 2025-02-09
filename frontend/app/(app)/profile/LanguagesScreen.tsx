import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from "@/components/ui/radio";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { CircleIcon } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import GradientButton from "@/components/custom/Button/GradientButton";
import Animated, { ZoomIn } from "react-native-reanimated";

const LanguagesScreen = () => {
  const { setNavbarTitle, setShowBackButton } = useLayout();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const {
    data: languagePreferences,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["languagePreferences"],
    queryFn: () => apiFetch("/user/preferences"),
  });

  const { mutate: updateLanguage, isPending } = useMutation({
    mutationKey: ["updateLanguage"],
    mutationFn: (language: string) =>
      apiFetch("/user/language/update", {
        method: "PUT",
        body: {
          selected_language: language,
        },
      }),

    onSuccess: () => {
      router.replace("/profile");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    setNavbarTitle("Languages");
    setShowBackButton(true);

    if (languagePreferences?.user_preferences?.selected_language) {
      setSelectedLanguage(
        languagePreferences?.user_preferences?.selected_language,
      );
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  useEffect(() => {
    console.log(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <View className="px-7 gap-7 mt-5 h-full">
      <View className="gap-1">
        <Text className="font-poppinsSemiBold text-xl">
          Select your preferred language
        </Text>
        <Text className="text-[#6B7280] font-poppins text-sm">
          This will change the language of the app
        </Text>
      </View>

      {isFetching || isLoading ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <Animated.View entering={ZoomIn}>
          <RadioGroup
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value)}
            className="gap-6"
          >
            <Radio value="en" size={"lg"}>
              <Image
                source={require("@/assets/icons/england-flag--icon.png")}
                className="h-8 w-8"
              />
              <RadioIndicator>
                <RadioIcon as={CircleIcon} color={"#F77F00"} fill={"#F77F00"} />
              </RadioIndicator>
              <RadioLabel>English</RadioLabel>
            </Radio>
            <Radio value="sk" size={"lg"}>
              <Image
                source={require("@/assets/icons/slovak-flag--icon.png")}
                className="h-8 w-8"
              />
              <RadioIndicator>
                <RadioIcon as={CircleIcon} color={"#F77F00"} fill={"#F77F00"} />
              </RadioIndicator>
              <RadioLabel>Slovak</RadioLabel>
            </Radio>
          </RadioGroup>
        </Animated.View>
      )}

      <View className="mt-7">
        <GradientButton
          disabled={isPending}
          title={"Save"}
          size={"full"}
          handleSubmit={() => updateLanguage(selectedLanguage)}
        />
      </View>
    </View>
  );
};

export default LanguagesScreen;

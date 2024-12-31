import { Text, View, TouchableOpacity } from "react-native";

import { router } from "expo-router";
import GenericIcon from "@/components/custom/Icon";

type ComponentProps = {
  title?: string;
  isBackButton?: boolean;
  isDetailsButton?: boolean;
  isVisible?: boolean;
  navbarColor?: string;
};

const TopNavigationComponent = ({
  title,
  isBackButton,
  isDetailsButton,
  isVisible,
  navbarColor,
}: ComponentProps) => {
  return (
    <>
      {isVisible && (
        <View className=" flex flex-row items-center justify-between px-7 pt-4 w-full mb-5">
          {isBackButton ? (
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#F7F8F8] h-12 w-12 flex items-center justify-center rounded-xl"
              onPress={() => router.back()}
            >
              <GenericIcon name={"ChevronLeft"} size={28} />
            </TouchableOpacity>
          ) : (
            <View className="h-12 w-12"></View>
          )}

          <Text
            className={`text-2xl font-poppinsBold ${
              navbarColor ? navbarColor : "text-black"
            }`}
          >
            {title ? title : null}
          </Text>

          {isDetailsButton ? (
            <TouchableOpacity className="bg-[#F7F8F8] h-12 w-12 flex items-center justify-center  rounded-xl">
              <GenericIcon name={"Ellipsis"} size={28} />
            </TouchableOpacity>
          ) : (
            <View className="h-12 w-12"></View>
          )}
        </View>
      )}
    </>
  );
};

export default TopNavigationComponent;

import { RootState } from "@/store/store";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import SuccessImage from "@/assets/images/success-image.svg";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { router } from "expo-router";

const SuccessScreen = () => {
  const user = useSelector((state: RootState) => state.user);

  const submitHandler = () => {
    router.replace("/home");
  };

  return (
    <View className=" flex flex-col items-center px-7 h-full pt-5">
      <View className="justify-start items-center  w-full">
        <SuccessImage height={"60%"} width={350} />
        <Text className="text-3xl mt-12 font-bold font-poppins">
          Welcome, {user.fullName || "Friend"}
        </Text>
        <Text className="font-poppins text-[#7B6F72] mt-2 w-2/3 text-center">
          You are all set now, let’s reach your goals together with us
        </Text>
      </View>

      <View className="w-full mt-auto mb-6">
        <GradientButtonComponent
          size={"full"}
          handleSubmit={submitHandler}
          title={"Go To Home"}
        />
      </View>
    </View>
  );
};

export default SuccessScreen;

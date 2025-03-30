import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { shadows } from "@/styles/shadows";
interface ComponentProps {
  user: UserBiometrics;
}

const ProfileDataCards = ({ user }: ComponentProps) => {
  const [userBiometrics, setUserBiometrics] = useState([]);
  const { t } = useTranslation("profile");

  useEffect(() => {
    setUserBiometrics(
      Object.keys(user).map((key) => ({
        key,
        value: user[key],
      })),
    );
  }, []);

  const calculateAge = (birthDate: string) => {
    return dayjs().diff(dayjs(birthDate), "year");
  };

  const suffixHandler = (key: string) => {
    switch (key) {
      case "weight":
        return "kg";
      case "height":
        return "cm";
      default:
        return "";
    }
  };

  return (
    <View className="flex-row flex-wrap gap-8 gap-y-5 mt-5">
      {userBiometrics.map((biometric) => (
        <View
          style={shadows.soft1}
          key={biometric.key}
          className="bg-white p-3 w-1/4 h-fit rounded-2xl gap-1 items-center"
        >
          <Text className="text-[#F77F00] font-poppinsSemiBold text-lg capitalize">
            {biometric.key === "birthDate"
              ? `${calculateAge(biometric.value)}yo`
              : biometric.value + suffixHandler(biometric.key)}
          </Text>
          <Text className="font-poppinsMedium text-[#7B6F72] capitalize">
            {biometric.key === "birthDate"
              ? t(`profileCards.profileDetails.age`, {
                  context: "profile",
                })
              : t(`profileCards.profileDetails.${biometric.key}`, {
                  context: "profile",
                })}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ProfileDataCards;

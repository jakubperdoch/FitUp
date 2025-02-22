import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProfilePictureMan from "@/assets/icons/profile--man.svg";
import ProfilePictureWoman from "@/assets/icons/profile--woman.svg";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  user: Partial<User>;
}

const ProfileHeaderComponent = ({ user }: ComponentProps) => {
  const { t } = useTranslation("profile");

  return (
    <View className="flex-row items-center gap-7">
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 0.8 }}
        colors={["rgba(247, 127, 0, .2)", "rgba(214, 40, 40, .2)"]}
        style={{
          padding: 15,
          borderRadius: 90,
          width: 90,
          height: 90,
          alignItems: "center",
        }}
      >
        {user.gender === "male" ? (
          <ProfilePictureMan height={70} width={70} style={{ marginTop: 10 }} />
        ) : (
          <ProfilePictureWoman
            height={70}
            width={70}
            style={{ marginTop: 10 }}
          />
        )}
      </LinearGradient>
      <View className="gap-1">
        <Text className="font-poppinsSemiBold text-xl">
          {user.userCredentials.fullName}
        </Text>
        <Text className="font-poppins text-[#7B6F72]">
          {user.userCredentials.email}
        </Text>
        <Text className="font-poppins text-[#7B6F72] capitalize">
          {t(`profileCards.profileDetails.goal.${user.goal.toLowerCase()}`, {
            context: "profile",
          })}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeaderComponent;

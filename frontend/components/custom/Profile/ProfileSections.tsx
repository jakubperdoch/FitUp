import { Switch, Text, TouchableOpacity, View } from "react-native";
import GenericIcon from "@/components/custom/Icon";
import { router } from "expo-router";
import { shadows } from "@/styles/shadows";

interface Link {
  title: string;
  icon: string;
  route?: string;
  isSwitch?: boolean;
}

interface ProfileSections {
  title: string;
  links: Link[];
}

interface ComponentProps {
  cards: ProfileSections[];
  notificationSwitchHandler?: () => void;
  isNotificationEnabled?: boolean;
}

const ProfileSectionsComponent = ({
  cards,
  isNotificationEnabled,
  notificationSwitchHandler,
}: ComponentProps) => {
  const onPressHandler = (route?: string) => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <View className="gap-7 mt-12">
      {cards.map((section) => (
        <View
          key={section.title}
          style={shadows.soft1}
          className="bg-white  rounded-2xl p-6"
        >
          <Text className="font-poppinsSemiBold text-2xl mb-5">
            {section.title}
          </Text>
          <View className="gap-5">
            {section.links.map((link, index) => (
              <TouchableOpacity
                onPress={() => onPressHandler(link.route)}
                key={index}
                className="flex-row items-center gap-3 "
                activeOpacity={0.7}
              >
                <GenericIcon name={link.icon} color={"#F77F00"} size={25} />
                <Text className="font-poppins text-lg me-auto text-[#7B6F72]">
                  {link.title}
                </Text>

                {link.isSwitch ? (
                  <Switch
                    onValueChange={notificationSwitchHandler}
                    value={isNotificationEnabled}
                    ios_backgroundColor={"#3e3e3e"}
                    trackColor={{ false: "#3e3e3e", true: "#F77F00" }}
                    thumbColor={"#fff"}
                  />
                ) : (
                  <GenericIcon
                    name="ChevronRight"
                    color={"#7B6F72"}
                    size={25}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default ProfileSectionsComponent;

import { setUser } from "@/store/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import ProfileHeaderComponent from "@/components/custom/Profile/Header";
import ProfileDataCards from "@/components/custom/Profile/DataCards";
import ProfileSections from "@/components/custom/Profile/ProfileSections";
import { useLayout } from "@/context/LayoutContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";

const ProfileSectionsData = [
  {
    title: "Account",
    links: [
      {
        title: "Preferences",
        icon: "User",
        route: "profile/PreferencesScreen",
      },
      {
        title: "Change Password",
        icon: "Lock",
        route: "profile/PasswordScreen",
      },
    ],
  },
  {
    title: "Notifications",
    links: [
      {
        title: "Pop-up Notifications",
        icon: "BellRing",
        isSwitch: true,
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Contact Us",
        icon: "Mail",
        route: "profile/ContactUsScreen",
      },
      {
        title: "Privacy Policy",
        icon: "ShieldCheck",
        route: "PrivacyPolicy",
      },
      {
        title: "Language",
        icon: "Languages",
        route: "profile/LanguagesScreen",
      },

      {
        title: "Attributions",
        icon: "Heart",
        route: "Attributions",
      },
    ],
  },
];

const ProfileScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const { logOut } = useAuth();
  const { setNavbarTitle } = useLayout();

  const notificationSwitchHandler = () => {
    setIsNotificationsEnabled((prev) => !prev);
    AsyncStorage.setItem("notifications", String(!isNotificationsEnabled));
  };

  const {
    data: user,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiFetch("/user/details"),
  });

  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      router.replace("/SignInScreen");
    },
  });

  useEffect(() => {
    setNavbarTitle("Profile");

    const getNotifications = async () => {
      const notifications = await AsyncStorage.getItem("notifications");
      setIsNotificationsEnabled(notifications === "true");
    };

    getNotifications().catch((err) => console.error(err));
  }, []);

  return (
    <ScrollView contentContainerClassName="px-7 pb-32">
      {isPending || isFetching ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <>
          <ProfileHeaderComponent user={user} />
          <ProfileDataCards user={user.userBiometrics} />
          <ProfileSections
            cards={ProfileSectionsData}
            notificationSwitchHandler={notificationSwitchHandler}
            isNotificationEnabled={isNotificationsEnabled}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => logoutMutation()}
          >
            <Text className="font-poppins text-center text-[#D62828] text-xl mt-8">
              Log Out
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

import { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const { t } = useTranslation(["profile", "headers"]);

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
    setNavbarTitle(t("profile", { ns: "headers" }));

    const getNotifications = async () => {
      const notifications = await AsyncStorage.getItem("notifications");
      setIsNotificationsEnabled(notifications === "true");
    };

    getNotifications().catch((err) => console.error(err));
  }, []);

  const ProfileSectionsData = [
    {
      title: t("profileCards.account.title", { context: "profile" }),
      links: [
        {
          title: t("profileCards.account.profileDetails", {
            context: "profile",
          }),
          icon: "User",
          route: "profile/ProfileDetailsScreen",
        },
        {
          title: t("profileCards.account.preferences", {
            context: "profile",
          }),
          icon: "Settings2",
          route: "profile/PreferencesScreen",
        },
        {
          title: t("profileCards.account.changePassword", {
            context: "profile",
          }),
          icon: "Lock",
          route: "profile/PasswordScreen",
        },
      ],
    },
    {
      title: t("profileCards.notifications.title", {
        context: "profile",
      }),
      links: [
        {
          title: t("profileCards.notifications.description", {
            context: "profile",
          }),
          icon: "BellRing",
          isSwitch: true,
        },
      ],
    },
    {
      title: t("profileCards.other.title", {
        context: "profile",
      }),
      links: [
        {
          title: t("profileCards.other.language", {
            context: "profile",
          }),
          icon: "Languages",
          route: "profile/LanguagesScreen",
        },

        {
          title: t("profileCards.other.explore", {
            context: "profile",
          }),
          icon: "GraduationCap",
          route: "profile/ExploreScreen",
        },
      ],
    },
  ];

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
              {t("profileCards.other.logout", { context: "profile" })}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

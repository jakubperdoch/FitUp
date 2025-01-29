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

const userData: User = {
  userCredentials: {
    fullName: "John Doe",
    email: "perdochjakub@gmail.com",
    password: "password",
  },
  userBiometrics: {
    birthDate: "1970-01-01T00:00:00.000Z",
    weight: 70,
    height: 180,
  },
  gender: "male",
  goal: "lose weight",
};

const ProfileSectionsData = [
  {
    title: "Account",
    links: [
      {
        title: "Personal Information",
        icon: "User",
        route: "PersonalInformation",
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
        route: "Language",
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

  const { setNavbarTitle } = useLayout();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const notificationSwitchHandler = () => {
    setIsNotificationsEnabled((prev) => !prev);
    AsyncStorage.setItem("notifications", String(!isNotificationsEnabled));
  };

  useEffect(() => {
    dispatch(setUser(userData));
    setNavbarTitle("Profile");

    const getNotifications = async () => {
      const notifications = await AsyncStorage.getItem("notifications");
      setIsNotificationsEnabled(notifications === "true");
    };

    getNotifications().catch((err) => console.error(err));
  }, []);

  return (
    <ScrollView contentContainerClassName="px-7 pb-32">
      <ProfileHeaderComponent user={user} />
      <ProfileDataCards user={user.userBiometrics} />
      <ProfileSections
        cards={ProfileSectionsData}
        notificationSwitchHandler={notificationSwitchHandler}
        isNotificationEnabled={isNotificationsEnabled}
      />

      <TouchableOpacity activeOpacity={0.7}>
        <Text className="font-poppins text-center text-[#D62828] text-xl mt-8">
          Log Out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

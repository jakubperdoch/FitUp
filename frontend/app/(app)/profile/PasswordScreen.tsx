import { Text, View } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import GenericIcon from "@/components/custom/Icon";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { router, useFocusEffect } from "expo-router";
import GradientButton from "@/components/custom/Button/GradientButton";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect } from "react";

const PasswordScreen = () => {
  const { setNavbarTitle, setShowBackButton } = useLayout();

  const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("Old Password is required"),
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(8, "Password must contain at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const watchFields = watch(["oldPassword", "newPassword", "confirmPassword"]);

  const submitHandler = (formData) => {
    // push formData to the backend
    router.replace("/profile");
  };

  useEffect(() => {
    setNavbarTitle("Change Password");
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  return (
    <View className="gap-7 mt-5 px-7">
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input size="xl" variant="rounded">
            <InputSlot>
              <GenericIcon name={"Lock"} />
            </InputSlot>
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="Old Password"
              autoCorrect={false}
            />
          </Input>
        )}
        name={"oldPassword"}
      />

      {errors?.oldPassword && (
        <Animated.View
          entering={ZoomIn}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {errors?.oldPassword?.message}
          </Text>
        </Animated.View>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input size="xl" variant="rounded">
            <InputSlot>
              <GenericIcon name={"Lock"} />
            </InputSlot>
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="New Password"
              autoCorrect={false}
            />
          </Input>
        )}
        name={"newPassword"}
      />

      {errors?.newPassword && (
        <Animated.View
          entering={ZoomIn}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {errors?.newPassword?.message}
          </Text>
        </Animated.View>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input size="xl" variant="rounded">
            <InputSlot>
              <GenericIcon name={"Lock"} />
            </InputSlot>
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="Confirm Password"
              autoCorrect={false}
            />
          </Input>
        )}
        name={"confirmPassword"}
      />

      {errors?.confirmPassword && (
        <Animated.View
          entering={ZoomIn}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {errors?.confirmPassword?.message}
          </Text>
        </Animated.View>
      )}

      <View className="mt-8">
        <GradientButton
          size={"full"}
          title={"Change Password"}
          handleSubmit={handleSubmit(submitHandler)}
        />
      </View>
    </View>
  );
};

export default PasswordScreen;

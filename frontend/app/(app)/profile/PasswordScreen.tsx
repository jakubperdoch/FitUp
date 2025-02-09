import { Text, View } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import GenericIcon from "@/components/custom/Icon";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { router, useFocusEffect } from "expo-router";
import GradientButton from "@/components/custom/Button/GradientButton";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";

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

  const { mutate: changePassword, error } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      apiFetch("/auth/change-password", {
        method: "PUT",
        body: {
          current_password: data.oldPassword,
          new_password: data.newPassword,
        },
      }),
    onSuccess: () => {
      router.replace("/profile");
    },
  });

  const submitHandler = (formData) => {
    changePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });
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
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="Old Password"
              autoCorrect={false}
              autoCapitalize={"none"}
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
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="New Password"
              autoCorrect={false}
              autoCapitalize={"none"}
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
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="Confirm Password"
              autoCorrect={false}
              autoCapitalize={"none"}
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

      {error && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="flex-col items-center gap-2 justify-center"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {error instanceof Error ? error.message : String(error)}
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

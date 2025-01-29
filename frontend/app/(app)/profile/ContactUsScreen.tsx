import { Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import { useLayout } from "@/context/LayoutContext";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { router, useFocusEffect } from "expo-router";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import GenericIcon from "@/components/custom/Icon";
import Animated, { ZoomIn } from "react-native-reanimated";
import GradientButton from "@/components/custom/Button/GradientButton";

const ContactUsScreen = () => {
  const { setNavbarTitle, setShowBackButton } = useLayout();

  const feedbackSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    feedback: yup.string().required("Feedback is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(feedbackSchema),
  });

  const watchFields = watch(["name", "email", "feedback"]);

  useEffect(() => {
    setNavbarTitle("Contact Us");
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  const submitHandler = (formData) => {
    // push formData to the backend
    router.replace("/profile");
  };

  return (
    <View className="gap-7 mt-5 px-7">
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input size="xl" variant="rounded">
            <InputSlot>
              <GenericIcon name={"User"} />
            </InputSlot>
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="Name"
              autoCorrect={false}
            />
          </Input>
        )}
        name={"name"}
      />

      {errors?.name && (
        <Animated.View
          entering={ZoomIn}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {errors?.name?.message}
          </Text>
        </Animated.View>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input size="xl" variant="rounded">
            <InputSlot>
              <GenericIcon name={"Mail"} />
            </InputSlot>
            <InputField
              className="text-lg"
              type={"text"}
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              autoCapitalize={"none"}
              autoCorrect={false}
            />
          </Input>
        )}
        name={"email"}
      />

      {errors?.email && (
        <Animated.View
          entering={ZoomIn}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {errors?.email?.message}
          </Text>
        </Animated.View>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Textarea
            size="xl"
            isReadOnly={false}
            className="rounded-2xl p-2 bg-[#F7F8F8]"
          >
            <TextareaInput
              value={value}
              onChangeText={onChange}
              autoCorrect={false}
              autoCapitalize={"none"}
              className="font-poppins text-lg"
              placeholder={
                "Please provide your feedback, questions, or concerns here."
              }
            />
          </Textarea>
        )}
        name={"feedback"}
      />

      {errors?.feedback && (
        <Animated.View
          entering={ZoomIn}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {errors?.feedback?.message}
          </Text>
        </Animated.View>
      )}

      <View className="mt-8">
        <GradientButton
          title={"Contact Us"}
          handleSubmit={handleSubmit(submitHandler)}
          size={"full"}
        />
      </View>
    </View>
  );
};

export default ContactUsScreen;

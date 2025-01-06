import { View, Text } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { Controller } from "react-hook-form";
import GenericIcon from "@/components/custom/Icon";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

type SignUpFormProps = {
  passwordVisibility: boolean;
  showPasswordHandler: () => void;
  formType: string;
  control: any;
  errors: any;
};

const SignUpForm = ({
  passwordVisibility,
  showPasswordHandler,
  formType,
  errors,
  control,
}: SignUpFormProps) => {
  return (
    <View className="w-full gap-5 flex ">
      {formType === "signup" ? (
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input size="xl" variant="rounded">
              <InputSlot>
                <FontAwesome name="user-o" size={20} color="#7B6F72" />
              </InputSlot>
              <InputField
                className="text-lg"
                type={"text"}
                value={value}
                onChangeText={onChange}
                placeholder="Full Name"
                autoCapitalize="words"
                autoCorrect={false}
              />
            </Input>
          )}
          name="name"
        />
      ) : null}

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
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input size="xl" variant="rounded">
            <InputSlot>
              <Feather name="mail" size={20} color="#7B6F72" />
            </InputSlot>
            <InputField
              className="text-lg"
              value={value}
              onChangeText={onChange}
              type={"text"}
              inputMode="email"
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Input>
        )}
        name="email"
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
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input size="xl" variant="rounded">
            <InputSlot>
              <Feather name="lock" size={20} color="#7B6F72" />
            </InputSlot>
            <InputField
              className="text-lg"
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              type={passwordVisibility ? "text" : "password"}
              autoCorrect={false}
            />
            <InputSlot className="pr-3" onPress={showPasswordHandler}>
              <Feather
                name={passwordVisibility ? "eye" : "eye-off"}
                size={22}
                color="#7B6F72"
              />
            </InputSlot>
          </Input>
        )}
        name="password"
      />

      {errors?.password && (
        <Animated.View
          entering={ZoomIn}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">
            {errors?.password?.message}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default SignUpForm;

import { FlatList, Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  nutritionData: {
    icon: any;
    value: number;
    suffix: string;
    metric: string;
  }[];
}

const MacroScrollComponent = ({ nutritionData }: ComponentProps) => {
  const { t } = useTranslation("meals");

  return (
    <View className="mt-10">
      <Text className="font-semibold font-poppins text-2xl mb-5 ms-6">
        {t("nutrition", { context: "meals" })}
      </Text>

      <FlatList
        data={nutritionData}
        contentContainerClassName="px-6"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-6" />}
        renderItem={({ item }) => (
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0.1, y: 0.8 }}
            colors={["rgba(214, 40, 40, 0.3)", "rgba(247, 127, 0, 0.3)"]}
            style={{
              height: 50,
              borderRadius: 15,
              paddingHorizontal: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View className="flex flex-row items-center gap-1">
              <Image className="h-9 w-9" source={item.icon} />
              <Text className="font-poppins">
                {item.value}
                {item.metric}{" "}
                {t(`nutritions.${item.suffix}`, { context: "meals" })}
              </Text>
            </View>
          </LinearGradient>
        )}
      />
    </View>
  );
};

export default MacroScrollComponent;

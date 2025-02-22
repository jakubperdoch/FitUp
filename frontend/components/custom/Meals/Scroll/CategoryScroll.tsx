import { ScrollView, Text, View } from "react-native";
import CategoryCardComponent from "./CategoryCard";
import { useTranslation } from "react-i18next";

type Category = {
  id: number;
  name: string;
};

type ComponentProps = {
  onClick: (name: string) => void;
  categories: Category[];
  categoryTitle?: string;
};

const CategoryScrollComponent = (props: ComponentProps) => {
  const { t } = useTranslation("meals");

  return (
    <View className="flex flex-col gap-5">
      <Text className="ms-7 text-2xl font-semibold font-poppins ">
        {props.categoryTitle || t("categories", { context: "meals" })}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-7  "
      >
        {props?.categories?.map((category) => {
          return (
            <CategoryCardComponent
              key={category.id}
              category={category}
              onClick={props.onClick}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CategoryScrollComponent;

import DashBoardCircle from "./DashboardCircle";
import { useMemo } from "react";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { shadows } from "@/styles/shadows";

interface ComponentProps {
  macros: {
    total_calories: number;
    total_carbs: number;
    total_fat: number;
    total_fiber: number;
    total_protein: number;
    total_sugar: number;
  };
}

const icons = {
  fire: require("@/assets/icons/fire.png"),
  transFats: require("@/assets/icons/trans-fats.png"),
  protein: require("@/assets/icons/protein.png"),
  carbohydrates: require("@/assets/icons/carbohydrates.png"),
  sugarCube: require("@/assets/icons/sugar-cube.png"),
  grain: require("@/assets/icons/grain.png"),
};

const defaultMacroData = [
  {
    icon: icons.fire,
    title: "Calories",
    colors: ["#FF4747", "#FFBBBB", "#FFDEDE"],
    type: "calories",
  },
  {
    icon: icons.transFats,
    title: "Fats",
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "fats",
  },
  {
    icon: icons.protein,
    title: "Protein",
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "protein",
  },
  {
    icon: icons.carbohydrates,
    title: "Carbs",
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "carbs",
  },
  {
    icon: icons.sugarCube,
    title: "Sugar",
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "sugar",
  },
  {
    icon: icons.grain,
    title: "Fiber",
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "fiber",
  },
];

const DashBoardComponent = ({ macros }: ComponentProps) => {
  const { t } = useTranslation();

  const macrosData = useMemo(() => {
    if (!macros) {
      return defaultMacroData.map((item) => ({ ...item, value: 0 }));
    }

    return [
      {
        ...defaultMacroData[1],
        title: t("dashboard.macros.fat", { ns: "home" }),
        value: macros.total_fat,
      },
      {
        ...defaultMacroData[0],
        title: t("dashboard.macros.calories", { ns: "home" }),
        value: macros.total_calories,
      },
      {
        ...defaultMacroData[2],
        title: t("dashboard.macros.protein", { ns: "home" }),
        value: macros.total_protein,
      },
      {
        ...defaultMacroData[3],
        title: t("dashboard.macros.carbs", { ns: "home" }),
        value: macros.total_carbs,
      },
      {
        ...defaultMacroData[4],
        title: t("dashboard.macros.sugar", { ns: "home" }),
        value: macros.total_sugar,
      },
      {
        ...defaultMacroData[5],
        title: t("dashboard.macros.fiber", { ns: "home" }),
        value: macros.total_fiber,
      },
    ];
  }, [macros]);

  return (
    <Animated.View
      entering={ZoomIn}
      style={shadows.soft4}
      className="bg-white rounded-3xl flex flex-row items-center justify-center flex-wrap gap-4 p-4 px-2"
    >
      {macrosData.map((dataCircle, index) => {
        return (
          <DashBoardCircle
            key={index}
            colorVariation={dataCircle.colors}
            type={dataCircle.type}
            title={dataCircle.title}
            value={dataCircle.value}
            icon={dataCircle.icon}
            circlesPerRow={3}
          />
        );
      })}
    </Animated.View>
  );
};

export default DashBoardComponent;

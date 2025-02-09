import DashBoardCircle from "./DashboardCircle";
import { useMemo, useState } from "react";
import Animated, { ZoomIn } from "react-native-reanimated";

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
    size: 280,
    colors: ["#FF4747", "#FFBBBB", "#FFDEDE"],
    type: "calories",
  },
  {
    icon: icons.transFats,
    title: "Fats",
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "fats",
  },
  {
    icon: icons.protein,
    title: "Protein",
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "protein",
  },
  {
    icon: icons.carbohydrates,
    title: "Carbs",
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "carbs",
  },
  {
    icon: icons.sugarCube,
    title: "Sugar",
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "sugar",
  },
  {
    icon: icons.grain,
    title: "Fiber",
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "fiber",
  },
];

const DashBoardComponent = ({ macros }: ComponentProps) => {
  const macrosData = useMemo(() => {
    if (!macros) {
      return defaultMacroData.map((item) => ({ ...item, value: 0 }));
    }

    return [
      { ...defaultMacroData[1], value: macros.total_fat },
      { ...defaultMacroData[0], value: macros.total_calories },
      { ...defaultMacroData[2], value: macros.total_protein },
      { ...defaultMacroData[3], value: macros.total_carbs },
      { ...defaultMacroData[4], value: macros.total_sugar },
      { ...defaultMacroData[5], value: macros.total_fiber },
    ];
  }, [macros]);

  return (
    <Animated.View
      entering={ZoomIn}
      className="bg-white shadow-soft-3 rounded-3xl flex flex-row items-center justify-center flex-wrap gap-4 p-4"
    >
      {macrosData.map((dataCircle, index) => {
        return (
          <DashBoardCircle
            key={index}
            colorVariation={dataCircle.colors}
            type={dataCircle.type}
            title={dataCircle.title}
            value={dataCircle.value}
            size={dataCircle.size}
            icon={dataCircle.icon}
          />
        );
      })}
    </Animated.View>
  );
};

export default DashBoardComponent;

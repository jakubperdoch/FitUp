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
    size: 280,
    colors: ["#FF4747", "#FFBBBB", "#FFDEDE"],
    type: "calories",
  },
  {
    icon: icons.transFats,
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "fats",
  },
  {
    icon: icons.protein,
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "protein",
  },
  {
    icon: icons.carbohydrates,
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "carbs",
  },
  {
    icon: icons.sugarCube,
    size: 230,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "sugar",
  },
  {
    icon: icons.grain,
    colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    type: "fiber",
  },
];

const DashBoardComponent = ({ macros }: ComponentProps) => {
  const macroData = useMemo(() => {}, [macros]);

  const [data, setData] = useState([
    {
      title: "Carbs",
      value: 0.3,
      size: 230,
      colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    },

    {
      title: "Calories",
      icon: "fire-flame-curved",
      value: 0.1,
      size: 280,
      colors: ["#FF4747", "#FFBBBB", "#FFDEDE"],
    },

    {
      title: "Fat",
      value: 0.3,
      size: 230,
      colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    },

    {
      title: "Fiber",
      value: 0.1,
      size: 230,
      colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    },

    {
      title: "Protein",
      value: 0.3,
      size: 230,
      colors: ["#FE9A05", "#F9CD8C", "#FFE4BC"],
    },
  ]);

  return (
    <Animated.View
      entering={ZoomIn}
      className="bg-white shadow-soft-3 rounded-3xl flex flex-row items-center justify-center flex-wrap gap-4 p-4"
    >
      {data.map((dataCircle, index) => {
        return (
          <DashBoardCircle
            key={index}
            colorVariation={dataCircle.colors}
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

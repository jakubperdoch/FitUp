import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { CartesianChart, Area } from "victory-native";
// @ts-ignore
import Poppins from "@/assets/fonts/Poppins-Medium.ttf";
import { useFont } from "@shopify/react-native-skia";

interface ComponentProps {
  stats: Partial<WorkoutStats>;
}

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

const WorkoutCardComponent = (props: ComponentProps) => {
  const font = useFont(Poppins, 12);

  return (
    <View style={{ height: 200 }}>
      <CartesianChart
        data={DATA}
        xKey="day"
        yKeys={["highTmp"]}
        axisOptions={{ font }}
      >
        {({ points, chartBounds }) => (
          <Area
            points={points.highTmp}
            y0={chartBounds.bottom}
            color="#D62828"
            curveType={"natural"}
            connectMissingData={true}
            animate={{ type: "timing", duration: 300 }}
          />
        )}
      </CartesianChart>
    </View>
  );
};

export default WorkoutCardComponent;

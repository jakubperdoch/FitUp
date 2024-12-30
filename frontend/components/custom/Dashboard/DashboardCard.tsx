import { View, Text, TouchableOpacity } from "react-native";

import TimeButton from "../Button/TimeButton";

type ComponentProps = {
  id: number;
  name: string;
  date?: {
    date: string;
    time: string;
  };
  timer?: number | null;
  showTimer?: boolean;
  timerHandler?: (timer: number, id: number) => void;

  quantity?: string;
  totalCal?: string;
  detailsHandler?: (id: number) => void;
};

const DashboardCardComponent = (props: ComponentProps) => {
  const dateHandler = (date: string) => {
    const currentDate = new Date().toLocaleDateString();
    if (currentDate != date) {
      return <Text>{date}</Text>;
    }
    return <Text>Today</Text>;
  };

  return (
    <TouchableOpacity
      onPress={() => props.detailsHandler(props.id)}
      className="w-full gap-2 bg-white shadow-soft-1  px-4 py-5 rounded-3xl flex-row justify-between"
    >
      <View className="gap-1">
        <Text className="font-poppins text-lg">{props.name}</Text>
        <View className="flex-row gap-2">
          {props.date && (
            <>
              <Text className="text-[#7B6F72] font-poppins">
                {dateHandler(props.date.date)}
              </Text>
              <Text className="text-[#7B6F72] font-poppins">|</Text>
              <Text className="text-[#7B6F72] font-poppins">
                {props.date.time}
              </Text>
            </>
          )}

          {props.totalCal && (
            <>
              <Text className="text-[#7B6F72] font-poppins">
                {props.totalCal}
              </Text>
              <Text className="text-[#7B6F72] font-poppins">|</Text>
              <Text className="text-[#7B6F72] font-poppins">
                {props.quantity}
              </Text>
            </>
          )}
        </View>
      </View>

      {props.showTimer && (
        <TimeButton
          id={props.id}
          timer={props.timer}
          timerHandler={props.timerHandler}
        />
      )}
    </TouchableOpacity>
  );
};

export default DashboardCardComponent;

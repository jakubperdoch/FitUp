import { Text, TouchableOpacity, View } from "react-native";

interface ComponentProps {
  selectedTimeOfDay: any;
  setSelectedTimeOfDay: (time: any) => void;
  partsOfDayData: any;
}

const TimeOfDaySectionComponent = ({
  setSelectedTimeOfDay,
  selectedTimeOfDay,
  partsOfDayData,
}: ComponentProps) => {
  return (
    <View className="mt-10 ms-6">
      <Text className="font-semibold font-poppins  text-2xl mb-5">
        Eaten During...
      </Text>
      <View className="flex flex-wrap flex-row gap-3 w-full">
        {partsOfDayData.map((time) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={time.value}
            onPress={() => setSelectedTimeOfDay(time)}
            className={`px-3 py-1 rounded-xl ${
              selectedTimeOfDay?.value === time.value
                ? "bg-[#F77F00]"
                : "bg-[#E5E6E6]"
            }`}
          >
            <Text className="text-lg font-poppins">{time.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TimeOfDaySectionComponent;

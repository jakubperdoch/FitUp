import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionIcon,
} from "@/components/ui/accordion";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import GenericIcon from "@/components/custom/Icon";
import { Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useTranslation } from "react-i18next";
type ComponentProps = {
  days?: Array<string>;
  changeDateHandler: (day: string) => void;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ScheduleAccordionComponent = (props: ComponentProps) => {
  const { isWorkoutEditable } = useContext(WorkoutContext);
  const { t } = useTranslation("workouts");

  const concatenatedDays = props.days
    ? props.days
        .map((day) => t(`workoutDetails.days.${day.toLowerCase()}`))
        .join(", ")
    : "";

  return (
    <Accordion
      size="md"
      type="single"
      className="bg-transparent"
      isCollapsible={true}
      isDisabled={false}
    >
      <AccordionItem value="day" style={{ borderRadius: 15 }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0.1, y: 0.8 }}
          colors={["rgba(214, 40, 40, 0.3)", "rgba(247, 127, 0, 0.3)"]}
          style={{ borderRadius: 15, paddingVertical: 5 }}
        >
          <AccordionHeader>
            <AccordionTrigger className="focus:web:rounded-lg">
              {({ isExpanded }) => {
                return (
                  <View className="flex-row w-full justify-between items-center pe-6">
                    <View className="flex-row items-center w-fit gap-3">
                      <GenericIcon name="CalendarDays" color="#7B6F72" />
                      <AccordionTitleText className="font-poppins  font-normal text-[#7B6F72]">
                        {t("workoutDetails.scheduleTitle", {
                          context: "workouts",
                        })}
                      </AccordionTitleText>

                      <Text
                        className="font-poppins font-normal w-24 me-2 text-[#7B6F72]"
                        ellipsizeMode={"tail"}
                        numberOfLines={1}
                      >
                        {concatenatedDays}
                      </Text>
                    </View>
                    {isExpanded ? (
                      <AccordionIcon
                        as={ChevronUpIcon}
                        className=" text-[#7B6F72]"
                      />
                    ) : (
                      <AccordionIcon
                        as={ChevronDownIcon}
                        className=" text-[#7B6F72]"
                      />
                    )}
                  </View>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
        </LinearGradient>
        <AccordionContent className="flex flex-wrap flex-row gap-3 mt-4">
          {days.map((day, index) => {
            const translatedDay = t(`workoutDetails.days.${day.toLowerCase()}`);

            return (
              <TouchableOpacity
                disabled={!isWorkoutEditable}
                activeOpacity={0.7}
                key={index}
                onPress={() => props.changeDateHandler(day)}
                className={`px-3 py-1 rounded-xl ${
                  props?.days?.includes(day) ? "bg-[#F77F00]" : "bg-[#E5E6E6]"
                }`}
              >
                <Text className="text-lg font-poppins">{translatedDay}</Text>
              </TouchableOpacity>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ScheduleAccordionComponent;

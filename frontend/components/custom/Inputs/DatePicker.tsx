import DatePicker from "react-native-date-picker";
import { Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import ActionSheetComponent from "../ActionSheet";
import { CalendarDays } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setBirthDate } from "@/store/user";

const DatePickerComponent = ({ control }) => {
  const [date, setDate] = useState(new Date());
  const [stringDate, setStringDate] = useState("");
  const [minumumDate, setMinimumDate] = useState(null);
  const [showActionsheet, setshowActionsheet] = useState(false);
  const handleClose = () => setshowActionsheet(false);
  const { t } = useTranslation("onboarding");
  const dispatch = useDispatch();

  useEffect(() => {
    setMinimumDate(
      new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
    );
  }, []);

  useEffect(() => {
    if (date && showActionsheet) {
      setStringDate(date ? date.toLocaleDateString("en-US") : "");
    }
  }, [date]);

  useEffect(() => {
    if (date) {
      dispatch(setBirthDate(new Date(date).toLocaleDateString()));
    }
  }, [date]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setshowActionsheet(true)}
        className="px-6 gap-4 rounded-xl bg-[#F7F8F8] flex flex-row h-16 items-center justify-start w-full"
      >
        <CalendarDays color={"#7B6F72"} size={20} />
        <Text
          className={`${
            stringDate ? "opacity-100" : "opacity-40"
          } font-semibold font-poppins text-lg text-[#7B6F72]`}
        >
          {stringDate ? stringDate : t("dateOfBirthPlaceholder")}
        </Text>
      </TouchableOpacity>

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <ActionSheetComponent
            showActionsheet={showActionsheet}
            closeHandler={handleClose}
          >
            <DatePicker
              date={date}
              mode="date"
              theme={"light"}
              onDateChange={(value) => {
                const selectedDate = new Date(value);
                setDate(selectedDate);
                onChange(selectedDate);
              }}
              maximumDate={minumumDate}
            />
          </ActionSheetComponent>
        )}
        name="birth"
      />
    </>
  );
};

export default DatePickerComponent;

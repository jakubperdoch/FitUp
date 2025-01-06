import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { Users } from "lucide-react-native";

const SelectComponent = ({ control, options, placeholder, controllerName }) => {
  let lastIndexOfArray = options.length - 1;

  const selectElement = (onChange) => (
    <Select onValueChange={onChange} className="w-full">
      <SelectTrigger variant="rounded" size={"xl"}>
        <SelectInput placeholder={placeholder} />
        <SelectIcon as={Users} size={20} />
      </SelectTrigger>
      <SelectPortal className="px-5 ">
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {options.map(
            (
              anObjectMapped: { label: string; value: string },
              index: string,
            ) => {
              return (
                <SelectItem
                  className={`${index == lastIndexOfArray.toString() ? "mb-6" : "mb-0"}`}
                  key={index}
                  label={anObjectMapped.label}
                  value={anObjectMapped.value}
                />
              );
            },
          )}
        </SelectContent>
      </SelectPortal>
    </Select>
  );

  return control ? (
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => selectElement(onChange)}
      name={controllerName}
    />
  ) : (
    selectElement(() => {})
  );
};

export default SelectComponent;

import {
  Popover,
  PopoverBackdrop,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from "@/components/ui/popover";

import { Text, TouchableOpacity, View } from "react-native";
import GenericIcon from "@/components/custom/Icon";
import { useState } from "react";

type ComponentProps = {};

const PopoverComponent = (props: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <View className="relative ">
      <Popover
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        className="end-5"
        trigger={(triggerProps) => {
          return (
            <TouchableOpacity {...triggerProps} className="py-1 px-2">
              <GenericIcon name={"Ellipsis"} />
            </TouchableOpacity>
          );
        }}
      >
        <PopoverBackdrop />
        <PopoverContent className="shadow-soft-1">
          <PopoverBody>
            <TouchableOpacity className="p-3">
              <Text className="font-poppins">Mark as warmup</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-3">
              <Text className="font-poppins">Mark as failure set</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-3">
              <Text className="font-poppins">Mark as drop set</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-3">
              <Text className="font-poppins text-red-700">Delete set</Text>
            </TouchableOpacity>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </View>
  );
};

export default PopoverComponent;

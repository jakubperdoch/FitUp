import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

type ComponentProps = {
  title: string;
  text: string;
  isDialogOpen: boolean;
  cancelButtonText: string;
  submitButtonText: string;
  submitHandler: () => void;
};

const AlertComponent = (props: ComponentProps) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  useEffect(() => {
    setShowAlertDialog(props.isDialogOpen);
  }, [props.isDialogOpen]);

  const handleClose = () => setShowAlertDialog(false);

  return (
    <AlertDialog isOpen={showAlertDialog}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text>{props.title}</Text>
        </AlertDialogHeader>

        <AlertDialogBody>
          <Text>{props.text}</Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <TouchableOpacity onPress={handleClose}>
            <Text>{props.cancelButtonText}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={props.submitHandler}>
            <Text>{props.submitButtonText}</Text>
          </TouchableOpacity>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertComponent;

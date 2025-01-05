import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";

const ExerciseModalComponent = () => {
  return (
    <Modal>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton></ModalCloseButton>
        </ModalHeader>
        <ModalBody />
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ExerciseModalComponent;

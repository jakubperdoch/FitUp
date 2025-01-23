import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import DigitInput from "@/components/custom/Workouts/ExerciseTable/DigitInput";
import { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";

type ComponentProps = {
  showModal: boolean;
  setShowModal: () => void;
  numberValue: Array<number>;
  exerciseIndex: number;
  superSetIndex: number;
  setIndex: number;
};

const ExerciseModalComponent = ({
  showModal,
  setShowModal,
  numberValue,
  exerciseIndex,
  superSetIndex,
  setIndex,
}: ComponentProps) => {
  const inputTypes = ["Reps", "Weight"];
  const { workoutInputHandler } = useContext(WorkoutContext);

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal()}>
      <ModalBackdrop />
      <ModalContent className="rounded-xl shadow-soft-2">
        <ModalHeader>
          <ModalCloseButton></ModalCloseButton>
        </ModalHeader>
        <ModalBody contentContainerClassName="justify-center items-center gap-5">
          {numberValue.map((numberValue, index) => (
            <DigitInput
              key={index}
              workoutInputHandler={workoutInputHandler}
              setIndex={setIndex}
              exerciseIndex={exerciseIndex}
              superSetIndex={superSetIndex}
              type={inputTypes[index]}
              numberValue={numberValue}
            />
          ))}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ExerciseModalComponent;

import {
	Modal,
	ModalBackdrop,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from '@/components/ui/modal';
import { Text } from 'react-native';

type ComponentProps = {
	isModalOpen: any;
	closeModalHandler: () => void;
	children: any;
};

const ModalComponent = (props: ComponentProps) => {
	return (
		<Modal
			isOpen={props.isModalOpen}
			onClose={() => props.closeModalHandler()}
			className='!rounded-2xl'>
			<ModalBackdrop />
			<ModalContent>
				<ModalHeader>
					<ModalCloseButton></ModalCloseButton>
				</ModalHeader>
				<ModalBody>{props.children}</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
};

export default ModalComponent;

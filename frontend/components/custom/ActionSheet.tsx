import {
	Actionsheet,
	ActionsheetBackdrop,
	ActionsheetContent,
	ActionsheetDragIndicator,
	ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet';

const ActionSheetComponent = ({ children, closeHandler, showActionsheet }) => {
	return (
		<>
			<Actionsheet
				isOpen={showActionsheet}
				onClose={closeHandler}
				closeOnOverlayClick={true}>
				<ActionsheetBackdrop />
				<ActionsheetContent>
					<ActionsheetDragIndicatorWrapper>
						<ActionsheetDragIndicator />
					</ActionsheetDragIndicatorWrapper>
					{children}
				</ActionsheetContent>
			</Actionsheet>
		</>
	);
};

export default ActionSheetComponent;

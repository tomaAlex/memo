import React from "react";
import { Modal } from "react-native";
import styles from "./MatchReportingSectionFormModal.module.scss";
import MatchReportingSectionForm from "./MatchReportingSectionForm";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const MatchReportingSectionFormModal = ({ visible, onRequestClose }: TProps) => {
	return (
		<Modal {...{ visible, onRequestClose }} animationType="slide">
			<MatchReportingSectionForm />
		</Modal>
	);
};

export default React.memo(MatchReportingSectionFormModal);

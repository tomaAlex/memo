import React from "react";
import { Modal } from "react-native";
import Carousel from "components/Carousel";
import TutorialNote1 from "./TutorialNote1";
import TutorialNote2 from "./TutorialNote2";
import TutorialNote3 from "./TutorialNote3";
import TutorialNote4 from "./TutorialNote4";
import styles from "../Tutorial.module.scss";
import TutorialNote5 from "./TutorialNote5";

type TProps = {
	visible: boolean;
	complete: () => void;
};

const TutorialNotes = ({ visible, complete }: TProps) => {
	return (
		<Modal {...{ visible }}>
			<Carousel
				displayIndex
				hideNavigationControls
				showOverlaidNavigation={{ value: true, deactivateWhenLast: true }}
				style={styles.container}
			>
				<TutorialNote1 />
				<TutorialNote2 />
				<TutorialNote3 />
				<TutorialNote4 />
				<TutorialNote5 {...{ complete }} />
			</Carousel>
		</Modal>
	);
};

export default React.memo(TutorialNotes);

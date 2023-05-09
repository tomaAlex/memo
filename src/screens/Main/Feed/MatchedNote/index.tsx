import React, { useRef, useState } from "react";
import { Modal } from "react-native";
import { ReduxProps, MatchPreview, ScreenProps, MainScreenNames } from "types/index";
import MatchedNoteContent from "./MatchedNoteContent";
import { useMatchToNoteObserver } from "./utils";

type TProps = {
	matchPreviews: ReduxProps["matchPreviews"];
	navigation: ScreenProps<MainScreenNames.Feed>["navigation"];
};

const MatchedNote = ({ matchPreviews, navigation }: TProps) => {
	const previousMatchPreviewsAmount = useRef(matchPreviews.length);
	const [matchToNote, setMatchToNote] = useState<MatchPreview | null>(null);
	useMatchToNoteObserver(previousMatchPreviewsAmount, matchPreviews, setMatchToNote);
	const clearMatchToNote = () => setMatchToNote(null);

	return (
		<Modal visible={matchToNote !== null} animationType="slide" onRequestClose={clearMatchToNote}>
			<MatchedNoteContent
				matchPreviewToNote={matchToNote as MatchPreview}
				closeMatchedNote={clearMatchToNote}
				navigation={navigation}
			/>
		</Modal>
	);
};

export default React.memo(MatchedNote);

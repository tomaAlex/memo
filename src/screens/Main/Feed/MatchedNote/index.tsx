import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
import { ReduxProps, MatchPreview, ScreenProps, MainScreenNames } from "types/index";
import MatchedNoteContent from "./MatchedNoteContent";
import observeMatchToNote from "./utils/observeMatchToNote";

type TProps = {
	matchPreviews: ReduxProps["matchPreviews"];
	navigation: ScreenProps<MainScreenNames.Feed>["navigation"];
};

const MatchedNote = ({ matchPreviews, navigation }: TProps) => {
	const previousMatchPreviewsAmount = useRef(matchPreviews.length);
	const currentMatchPreviewsAmount = matchPreviews.length;
	const [natchToNote, setMatchToNote] = useState<MatchPreview | null>(null);
	const clearMatchToNote = () => setMatchToNote(null);

	useEffect(
		() => observeMatchToNote(previousMatchPreviewsAmount, matchPreviews, setMatchToNote),
		[currentMatchPreviewsAmount, matchPreviews]
	);

	return (
		<Modal visible={natchToNote !== null} animationType="slide" onRequestClose={clearMatchToNote}>
			<MatchedNoteContent
				matchPreviewToNote={natchToNote as MatchPreview}
				closeMatchedNote={clearMatchToNote}
				navigation={navigation}
			/>
		</Modal>
	);
};

export default React.memo(MatchedNote);

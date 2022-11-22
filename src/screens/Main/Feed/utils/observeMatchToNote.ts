import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { MatchPreview } from "types/index";

const observeMatchToNote = (
	previousMatchPreviewsAmount: MutableRefObject<number>,
	matchPreviews: MatchPreview[],
	setMatchToNote: Dispatch<SetStateAction<MatchPreview | null>>
) => {
	console.log("observeMatchToNote", previousMatchPreviewsAmount, matchPreviews.length);
	const currentMatchPreviewsAmount = matchPreviews.length;
	const shouldUpdateMatchToNote = previousMatchPreviewsAmount.current + 1 === currentMatchPreviewsAmount;
	previousMatchPreviewsAmount.current = currentMatchPreviewsAmount;
	if (!shouldUpdateMatchToNote) {
		return;
	}
	setMatchToNote(matchPreviews[matchPreviews.length - 1]);
};

export default observeMatchToNote;

import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { MatchPreview } from "types/index";

const observeMatchToNote = (
	previousMatchPreviewsAmount: MutableRefObject<number>,
	matchPreviews: MatchPreview[],
	setMatchToNote: Dispatch<SetStateAction<MatchPreview | null>>
) => {
	const currentMatchPreviewsAmount = matchPreviews.length;
	const cachedPreviousMatchPreviewsAmount = previousMatchPreviewsAmount.current;
	previousMatchPreviewsAmount.current = currentMatchPreviewsAmount;
	const possibleMatchToNote = matchPreviews[matchPreviews.length - 1];
	const increasedOneMatch = currentMatchPreviewsAmount - cachedPreviousMatchPreviewsAmount === 1;
	if (!increasedOneMatch) {
		return;
	}
	const hasMatchBeenNoted = possibleMatchToNote.lastMessage !== null;
	if (hasMatchBeenNoted) {
		return;
	}
	setMatchToNote(possibleMatchToNote);
};

export default observeMatchToNote;

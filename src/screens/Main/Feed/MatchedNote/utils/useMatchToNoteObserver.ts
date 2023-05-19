import { useMatchMessages } from "hooks";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { MatchPreview } from "types";

export const useMatchToNoteObserver = (
	previousMatchPreviewsAmount: MutableRefObject<number>,
	matchPreviews: MatchPreview[],
	setMatchToNote: Dispatch<SetStateAction<MatchPreview | null>>
) => {
	const currentMatchPreviewsAmount = matchPreviews.length;
	const cachedPreviousMatchPreviewsAmount = previousMatchPreviewsAmount.current;
	previousMatchPreviewsAmount.current = currentMatchPreviewsAmount;
	const possibleMatchToNote = matchPreviews[matchPreviews.length - 1];
	const increasedOneMatch = currentMatchPreviewsAmount - cachedPreviousMatchPreviewsAmount === 1;
	const [possibleMatchToNoteMessages] = useMatchMessages(increasedOneMatch ? possibleMatchToNote.id : "");
	if (!increasedOneMatch) {
		return;
	}
	const hasMatchBeenNoted = !!possibleMatchToNoteMessages?.length;
	if (hasMatchBeenNoted) {
		return;
	}
	setMatchToNote(possibleMatchToNote);
};

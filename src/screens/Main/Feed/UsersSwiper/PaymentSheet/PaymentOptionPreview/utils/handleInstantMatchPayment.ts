import React from "react";
import Swiper from "react-native-deck-swiper";
import RBSheet from "react-native-raw-bottom-sheet";
import { IdentifiedUser } from "types/index";
import mixUnlockSwiperAndCloseRBsheetMethod from "./mixUnlockSwiperAndCloseRBsheetMethod";
import payInstantMatch from "./payInstantMatch";

const handleInstantMatchPayment = async (
	userToInstantlyMatchId: string,
	cardId: string,
	refRBSheet: React.RefObject<RBSheet>,
	setIsSwiperBlocked: (isSwiperBlocked: boolean) => void,
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>,
	setWasBottomSheetPrematurelyClosed: (wasBottomSheetPrematurelyClosed: boolean) => void
): Promise<void> => {
	const wasInstantMatchSuccessful = await payInstantMatch(userToInstantlyMatchId, cardId);
	console.log({ wasInstantMatchSuccessful });
	const unlockSwiperAndCloseRBsheet = mixUnlockSwiperAndCloseRBsheetMethod(refRBSheet, setIsSwiperBlocked);
	if (wasInstantMatchSuccessful) {
		unlockSwiperAndCloseRBsheet();
		return;
	}
	swiperReference.current?.swipeBack(() => {
		setWasBottomSheetPrematurelyClosed(false);
		unlockSwiperAndCloseRBsheet();
	});
};

export default handleInstantMatchPayment;

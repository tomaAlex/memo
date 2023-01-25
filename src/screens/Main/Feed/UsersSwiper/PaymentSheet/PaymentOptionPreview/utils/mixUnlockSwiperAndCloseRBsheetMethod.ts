import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";

const mixUnlockSwiperAndCloseRBsheetMethod = (
	refRBSheet: React.RefObject<RBSheet>,
	setIsSwiperBlocked: (isSwiperBlocked: boolean) => void
) => {
	const unlockSwiper = () => setIsSwiperBlocked(false);
	const closeRBsheet = () => refRBSheet.current?.close();
	return () => {
		unlockSwiper();
		closeRBsheet();
	};
};

export default mixUnlockSwiperAndCloseRBsheetMethod;

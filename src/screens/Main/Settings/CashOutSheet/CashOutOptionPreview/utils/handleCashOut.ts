import React from "react";
import cashOut from "./cashOut";
import RBSheet from "react-native-raw-bottom-sheet";

const handleCashOut = async (
	bankId: string,
	refRBSheet: React.RefObject<RBSheet>,
	setShouldFetchBalance: (shouldFetchBalance: boolean) => void,
	setIsCashingOut: (isCashingOut: boolean) => void
): Promise<void> => {
	setIsCashingOut(true);
	try {
		await cashOut(bankId);
		// cash out was successful
		setShouldFetchBalance(true);
	} catch (error) {
		// cash out was unsuccessful, something went wrong
	}
	setIsCashingOut(false);
	refRBSheet.current?.close();
};

export default handleCashOut;

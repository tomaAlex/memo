import React from "react";
import cashOut from "./cashOut";
import RBSheet from "react-native-raw-bottom-sheet";

const handleCashOut = async (
	bankId: string,
	refRBSheet: React.RefObject<RBSheet>,
	setShouldFetchBalance: (shouldFetchBalance: boolean) => void
): Promise<void> => {
	const wasCashOutSuccessful = await cashOut(bankId);
	console.log({ wasCashOutSuccessful });
	if (wasCashOutSuccessful) {
		setShouldFetchBalance(true);
	}
	refRBSheet.current?.close();
};

export default handleCashOut;

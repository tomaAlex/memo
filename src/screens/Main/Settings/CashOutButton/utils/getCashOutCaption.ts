import { MINIMUM_PENCE_BALANCE_TO_CASH_OUT } from "constants/index";
import { TFunction } from "i18next";

const getCashOutCaption = (hasInstantMatchingOn: boolean, balance: number, t: TFunction) => {
	const captionPrefix = "Caption";
	if (!hasInstantMatchingOn) {
		return t(`${captionPrefix}.instantMatchingIsOff`);
	}
	const leftBalanceUntilMinimum = MINIMUM_PENCE_BALANCE_TO_CASH_OUT - balance;
	if (leftBalanceUntilMinimum > 0) {
		return t(`${captionPrefix}.insufficientBalance`, { count: leftBalanceUntilMinimum / 100 });
	}
	return t(`${captionPrefix}.cashOut`, { count: balance / 100 });
};

export default getCashOutCaption;

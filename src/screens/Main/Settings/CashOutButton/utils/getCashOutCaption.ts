import { MINIMUM_PENCE_BALANCE_TO_CASH_OUT } from "constants/index";

const getCashOutCaption = (hasInstantMatchingOn: boolean, balance: number) => {
	if (!hasInstantMatchingOn) {
		return "Turn on Instant Matching to cash out";
	}
	const leftBalanceUntilMinimum = MINIMUM_PENCE_BALANCE_TO_CASH_OUT - balance;
	if (leftBalanceUntilMinimum > 0) {
		return `Cash out when you get £${leftBalanceUntilMinimum / 100} more`;
	}
	return `Cash out £${balance / 100} now`;
};

export default getCashOutCaption;

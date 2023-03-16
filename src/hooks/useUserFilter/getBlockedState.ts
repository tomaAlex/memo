import { IdentifiedUser } from "types/index";

/**
 * Check whether the user to recommend has been reported by the user to recommend for.
 * @param selfId The user id of the user to recommend for.
 * @param reports The reports of the user to possibly recommend.
 * @returns True if the user to recommend has NOT been reported by the user to recommend for.
 */
const getBlockedState = (selfId: IdentifiedUser["id"], reports: IdentifiedUser["reports"]): boolean => {
	return reports.some((report) => report.user === selfId);
};

export default getBlockedState;

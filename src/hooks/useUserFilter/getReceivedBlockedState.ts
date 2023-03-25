import { IdentifiedUser } from "types/index";

/**
 * Check whether the user to recommend for has been reported by the user to recommend.
 * @param userToRecommendId The user id of the user to recommend.
 * @param selfReports The reports of the user to recommend for.
 * @param selfFlags The flags of the user to recommend for.
 * @returns True if the user to recommend for has NOT been reported by the user to recommend.
 */
const getReceivedBlockedState = (
	userToRecommendId: IdentifiedUser["id"],
	selfReports: IdentifiedUser["reports"],
	selfFlags: IdentifiedUser["flags"]
): boolean => {
	const reporters = selfReports.map((report) => report.user);
	const blocks = [...reporters, ...selfFlags];
	return blocks.includes(userToRecommendId);
};

export default getReceivedBlockedState;

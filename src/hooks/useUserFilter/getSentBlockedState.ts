import { IdentifiedUser } from "types/index";

/**
 * Check whether the user to recommend has been reported by the user to recommend for.
 * @param selfId The user id of the user to recommend for.
 * @param reports The reports of the user to possibly recommend.
 * @param flags The flags of the user to possibly recommend.
 * @returns True if the user to recommend has NOT been reported by the user to recommend for.
 */
const getSentBlockedState = (
	selfId: IdentifiedUser["id"],
	reports: IdentifiedUser["reports"],
	flags: IdentifiedUser["flags"]
): boolean => {
	const reporters = reports.map((report) => report.user);
	const blocks = [...reporters, ...flags];
	return blocks.includes(selfId);
};

export default getSentBlockedState;

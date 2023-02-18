import { IdentifiedUser } from "types/index";
import { getAgeFromBirthDate } from "utils/index";

const getUserPreferredAgeState = (
	unfilteredUserBirthDate: IdentifiedUser["birthDate"],
	minimumAge: number,
	maximumAge: number
): boolean => {
	const age = getAgeFromBirthDate(unfilteredUserBirthDate);
	return age >= minimumAge && age <= maximumAge;
};

export default getUserPreferredAgeState;

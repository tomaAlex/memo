import { Gender } from "types/index";

const getUserPreferredGenderState = (unfilteredUserGender: Gender, preferredGenders: Gender[]): boolean => {
	return preferredGenders.includes(unfilteredUserGender);
};

export default getUserPreferredGenderState;

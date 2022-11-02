import { Location } from "types/index";

const getLocationFromIndividualFields = (country?: string, state?: string, city?: string): Location | undefined => {
	if (country === undefined) {
		return undefined;
	}
	return {
		country,
		state: state as string,
		city: city as string,
	};
};

export default getLocationFromIndividualFields;

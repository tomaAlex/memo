import { getLocation } from "utils/index";
import { DetailsForm, EmbodimentForm, Gender, IdentificationForm, User } from "types/index";

const assembleUser = async (
	identification: IdentificationForm,
	details: DetailsForm,
	embodiment: EmbodimentForm
): Promise<User> => {
	const coordinates = await getLocation();
	return {
		...identification,
		...details,
		...embodiment,
		likes: [] as string[],
		dislikes: [] as string[],
		matches: [] as string[],
		coordinates,
		tokens: [] as string[],
		hasInstantMatchingOn: true,
		features: [] as User["features"],
		inAppInteractions: 0,
		searchFilters: {
			genders: [Gender.FEMALE, Gender.MALE],
			ageRange: [18, 30],
			maximumDistance: 50,
			likesOnly: false,
		},
		reports: [],
		flags: [],
		updates: {},
	};
};

export default assembleUser;

import { getLocation } from "utils/index";
import { DetailsForm, EmbodimentForm, IdentificationForm, User } from "types/index";

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
	};
};

export default assembleUser;

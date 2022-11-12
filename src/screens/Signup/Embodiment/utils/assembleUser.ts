import { DetailsForm, EmbodimentForm, IdentificationForm, User } from "types/index";

const assembleUser = (identification: IdentificationForm, details: DetailsForm, embodiment: EmbodimentForm): User => {
	return {
		...identification,
		...details,
		...embodiment,
		likes: [] as string[],
		dislikes: [] as string[],
		matches: [] as string[],
	};
};

export default assembleUser;

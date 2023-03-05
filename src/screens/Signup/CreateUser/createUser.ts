import { getLocation } from "utils/index";
import { DetailsForm, EmbodimentForm, Gender, IdentificationForm, PhotoForm, User } from "types/index";

const createUser = async (photoForm: PhotoForm): Promise<User> => {
	try {
		console.log("Before coordinates");
		const coordinates = await getLocation();
		console.log("Got location");
		return {
			...photoForm,
			birthDate: photoForm.birthDate.toString() as unknown as Date,
			location: { country: "United Kingdom", city: "London", state: "United Kingdom" },
			school: "King's College London",
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
		};
	} catch {
		return Promise.reject("Please allow location services from settings");
	}
};

export default createUser;

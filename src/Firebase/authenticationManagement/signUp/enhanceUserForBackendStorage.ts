import { User } from "types/index";

export const enhanceUserForBackendStorage = (user: User) => {
	return {
		...user,
		likes: [] as string[],
		dislikes: [] as string[],
		matches: [] as string[],
	};
};

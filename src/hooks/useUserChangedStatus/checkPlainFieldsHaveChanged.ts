import { User } from "types/index";

const checkPlainFieldsHaveChanged = (user: User, possiblyChangedUser: User): boolean => {
	type UserKey = keyof User;
	type UserKeys = UserKey[];
	const specialKeysOfVerification = ["coordinates", "features", "searchFilters"] as UserKeys;
	const plainKeysOfVerification = (Object.keys(user) as UserKeys).filter(
		(key) => !specialKeysOfVerification.includes(key)
	);
	for (const key of plainKeysOfVerification) {
		if (user[key] !== possiblyChangedUser[key]) return true;
	}
	return false;
};

export default checkPlainFieldsHaveChanged;

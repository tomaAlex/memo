import { User } from "types/index";
import checkStringifiedFieldsHaveChanged from "./checkStringifiedFieldsHaveChanged";

const checkPlainFieldsHaveChanged = (user: User, possiblyChangedUser: User): boolean => {
	type UserKey = keyof User;
	type UserKeys = UserKey[];
	const specialKeysOfVerification = ["searchFilters"] as UserKeys;
	const plainKeysOfVerification = (Object.keys(user) as UserKeys).filter(
		(key) => !specialKeysOfVerification.includes(key)
	);
	for (const key of plainKeysOfVerification) {
		const currentUserFieldValue = user[key];
		const possiblyChangedUserFieldValue = possiblyChangedUser[key];
		if (checkStringifiedFieldsHaveChanged(currentUserFieldValue, possiblyChangedUserFieldValue)) {
			return true;
		}
	}
	return false;
};

export default checkPlainFieldsHaveChanged;

import { createUserObject } from "Firebase/index";
import { ReduxProps, User } from "types";

/**
 * Explicitly update the user inside redux before navigating
 * to the other screens using the user object from the global state,
 * in order to prevent unexpected crashings.
 * @param userToStore The user we want to explicitly store
 * @param userId The user id of the user
 * @param updateUser The redux action / reducer.
 */
const storeUser = async (userToStore: User, userId: string, updateUser: ReduxProps["updateUser"]) => {
	await createUserObject(userToStore, userId);
	updateUser({ ...userToStore, id: userId });
};

export default storeUser;

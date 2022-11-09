import { firestore } from "firebase-admin";
import { getUserData } from "../../utils";
import checkForNewMatchPossibility from "./checkForNewMatchPossibility";
import getLastLikedUser from "./getLastLikedUser";
import matchUsers from "./matchUsers";

const handleUserMatches = async (
	changedUser: firestore.DocumentReference<User>,
	beforeChangeUserData: User,
	afterChangeUserData: User
) => {
	const mayThereBeANewMatch = checkForNewMatchPossibility(beforeChangeUserData, afterChangeUserData);
	if (!mayThereBeANewMatch) {
		return;
	}
	const lastLikedUser = getLastLikedUser(afterChangeUserData);
	const lastLikedUserData = await getUserData(lastLikedUser);
	const shouldMatchBeCreated = lastLikedUserData.likes.includes(changedUser.id);
	if (!shouldMatchBeCreated) {
		return;
	}
	await matchUsers(changedUser, lastLikedUser);
};

export default handleUserMatches;

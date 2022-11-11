import { firestore } from "firebase-admin";

const getExclusivelyMatchedIdentifiedUsers = async (
	matchData: Match,
	requestingUserId: string
): Promise<IdentifiedUser[]> => {
	const exclusivelyMatchedUserIds = matchData.matchedUsers.filter(
		(exclusivelyMatchedUserId) => exclusivelyMatchedUserId !== requestingUserId
	);
	const exclusivelyMatchedUsersSnapshot = (await firestore()
		.collection("users")
		.where(firestore.FieldPath.documentId(), "in", exclusivelyMatchedUserIds)
		.get()) as firestore.QuerySnapshot<User>;
	const exclusivelyMatchedUsersSnapshots = exclusivelyMatchedUsersSnapshot.docs;
	const exclusivelyMatchedUsers = exclusivelyMatchedUsersSnapshots.map((exclusivelyMatchedUserSnapshot) =>
		exclusivelyMatchedUserSnapshot.data()
	);
	return exclusivelyMatchedUsers.map((exclusivelyMatchedUser, exclusivelyMatchedUserIndex): IdentifiedUser => {
		const exclusivelyMatchedUserId = exclusivelyMatchedUsersSnapshots[exclusivelyMatchedUserIndex].id;
		return { ...exclusivelyMatchedUser, id: exclusivelyMatchedUserId };
	});
};

export default getExclusivelyMatchedIdentifiedUsers;

import store from "redux/store";
import { TFunction } from "i18next";
import { Alert } from "react-native";
import { IdentifiedUser } from "types/index";
import firestore from "@react-native-firebase/firestore";

export const getFlaggingConfirmation = (
	translateFlaggingNotes: TFunction,
	userToFlag: IdentifiedUser | null,
	resetFilteredRecommendations: () => void
) => {
	if (!userToFlag) {
		// there is no user to be flagged yet
		return;
	}
	const {
		user: { id: selfId },
	} = store.getState();
	const userToFlagDocumentReference = firestore().collection<IdentifiedUser>("users").doc(userToFlag.id);
	Alert.alert(translateFlaggingNotes("Confirmation.title"), translateFlaggingNotes("Confirmation.caption"), [
		{
			text: translateFlaggingNotes("Confirmation.flag"),
			style: "destructive",
			onPress: async () => {
				const userToFlagSnapshot = await userToFlagDocumentReference.get();
				const userToFlagData = userToFlagSnapshot.data() as IdentifiedUser;
				const { flags: previousFlags } = userToFlagData;
				const updatedFlags = [...previousFlags, selfId];
				await userToFlagDocumentReference.update({ flags: updatedFlags });
				resetFilteredRecommendations();
			},
		},
		{ text: translateFlaggingNotes("Confirmation.cancel"), style: "cancel" },
	]);
};

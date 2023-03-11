import { TFunction } from "i18next";
import { Alert } from "react-native";

export const getDeletionConfirmation = (t: TFunction) => {
	Alert.alert(t("Confirmation.title"), t("Confirmation.caption"), [
		{
			text: t("Confirmation.delete"),
			style: "destructive",
			onPress: async () => {
				// setIsLoggingOut(true);
				// await auth().signOut();
				// setIsLoggingOut(false);
				// navigation.reset({
				// 	index: 0,
				// 	routes: [{ name: ScreenNames.Login }],
				// });
				console.log("Delete account");
			},
		},
		{ text: t("Confirmation.cancel"), style: "cancel" },
	]);
};

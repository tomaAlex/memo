import { TFunction } from "i18next";
import { Alert } from "react-native";
import deleteAccount from "./deleteAccount";
import { ScreenProps, SettingsScreenNames } from "types/index";

export const getDeletionConfirmation = (
	t: TFunction,
	setIsDeletingAccount: (isDeletingAccount: boolean) => void,
	navigation: ScreenProps<SettingsScreenNames.Preferences>["navigation"]
) => {
	Alert.alert(t("Confirmation.title"), t("Confirmation.caption"), [
		{
			text: t("Confirmation.delete"),
			style: "destructive",
			onPress: async () => {
				await deleteAccount(setIsDeletingAccount, navigation);
			},
		},
		{ text: t("Confirmation.cancel"), style: "cancel" },
	]);
};

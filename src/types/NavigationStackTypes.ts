import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { MainScreenNames, ScreenNames, SettingsScreenNames } from "./ScreenNames";
import { IdentifiedUser, User } from "./User";

type NavigationStackTypesStructure = { [key in string]: any };
type NavigationTabTypesStructure = { [key in string]: any };

export type IdentificationForm = {
	firstName: User["firstName"];
	lastName: User["lastName"];
	gender: User["gender"];
	birthDate: User["birthDate"];
};

export type DetailsForm = {
	job: User["job"];
	school: User["school"];
	description: User["description"];
	location: User["location"];
};

export type EmbodimentForm = {
	height: User["height"];
	orientation: User["orientation"];
	photos: User["photos"];
};

export interface NavigationStackTypes extends NavigationStackTypesStructure {
	[ScreenNames.Observer]: undefined;
	[ScreenNames.Login]: undefined;
	[ScreenNames.Identification]: undefined;
	[ScreenNames.Details]: {
		identification: IdentificationForm;
	};
	[ScreenNames.Embodiment]: {
		identification: IdentificationForm;
		details: DetailsForm;
	};
	[ScreenNames.Main]: {
		uid?: string;
	};
	[ScreenNames.MatchChat]: {
		matchId: string;
		matchedUsers: IdentifiedUser[];
		matchTimestamp: FirebaseFirestoreTypes.Timestamp;
		expiresAt: FirebaseFirestoreTypes.Timestamp;
	};
	[ScreenNames.ProfilePreview]: {
		userToPreviewId: string;
	};
}

export interface MainNavigationTabTypes extends NavigationTabTypesStructure {
	[MainScreenNames.Feed]: { uid?: string };
	[MainScreenNames.Chats]: undefined;
	[MainScreenNames.Settings]: undefined;
}

export interface SettingsNavigationStackTypes extends NavigationStackTypesStructure {
	[SettingsScreenNames.Photos]: undefined;
	[SettingsScreenNames.Information]: undefined;
	[SettingsScreenNames.Preferences]: undefined;
}

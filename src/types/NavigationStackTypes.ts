import { MainScreenNames, ScreenNames } from "./ScreenNames";
import { User } from "./User";

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
	[ScreenNames.Main]: undefined;
}

export interface MainNavigationTabTypes extends NavigationTabTypesStructure {
	[MainScreenNames.Feed]: undefined;
	[MainScreenNames.Chats]: undefined;
}

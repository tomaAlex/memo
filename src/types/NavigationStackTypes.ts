import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { MainScreenNames, ScreenNames, SettingsScreenNames } from "./ScreenNames";
import { IdentifiedUser, User } from "./User";

type NavigationStackTypesStructure = { [key in string]: any };
type NavigationTabTypesStructure = { [key in string]: any };
type NavigationStepTypesStructure = {
	[key in string]:
		| {
				data: any;
				stepCount?: number;
		  }
		| undefined;
};

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

export type FirstNameForm = {
	firstName: User["firstName"];
};

export type LastNameForm = {
	lastName: User["lastName"];
} & FirstNameForm;

export type BirthdateForm = {
	birthDate: User["birthDate"];
} & LastNameForm;

export type GenderForm = {
	gender: User["gender"];
} & BirthdateForm;

export type OrientationForm = {
	orientation: User["orientation"];
} & GenderForm;

export type HeightForm = {
	height: User["height"];
} & OrientationForm;

export type WorkForm = {
	work: User["job"];
} & HeightForm;

export type DescriptionForm = {
	description: User["description"];
} & WorkForm;

export type PhotoForm = {
	photos: User["photos"];
} & DescriptionForm;

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
	[ScreenNames.FirstName]: undefined;
	[ScreenNames.LastName]: {
		firstNameForm: FirstNameForm;
		stepNumber: number;
	};
	[ScreenNames.BirthDate]: {
		lastNameForm: LastNameForm;
		stepNumber: number;
	};
	[ScreenNames.Gender]: {
		birthdateForm: BirthdateForm;
		stepNumber: number;
	};
	[ScreenNames.Orientation]: {
		genderForm: GenderForm;
		stepNumber: number;
	};
	[ScreenNames.Height]: {
		orientationForm: OrientationForm;
		stepNumber: number;
	};
	[ScreenNames.Work]: {
		heightForm: HeightForm;
		stepNumber: number;
	};
	[ScreenNames.Description]: {
		workForm: WorkForm;
		stepNumber: number;
	};
	[ScreenNames.Photos]: {
		descriptionForm: DescriptionForm;
		stepNumber: number;
	};
	[ScreenNames.SignupConfirmation]: undefined;
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

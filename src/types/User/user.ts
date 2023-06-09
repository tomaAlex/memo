import { UpdateManagedDocument } from "types/Firebase";
import { Coordinates } from "./coordinates";
import { Gender } from "./gender";
import { LivedFeature, LivedFeatureExpiration } from "./livedFeature";
import { Location } from "./location";
import { Orientation } from "./orientation";
import { Report } from "./Report";

export interface User extends UpdateManagedDocument {
	firstName: string;
	lastName: string;
	gender: Gender;
	birthDate: Date;
	job?: string;
	school?: string;
	description?: string;
	location?: Location;
	height?: number;
	orientation: Orientation;
	photos: string[];
	likes: string[];
	dislikes: string[];
	matches: string[];
	coordinates: Coordinates;
	tokens: string[];
	hasInstantMatchingOn: boolean;
	stripeId?: string;
	features: LivedFeature<LivedFeatureExpiration>[];
	inAppInteractions: number;
	searchFilters: {
		ageRange: [number, number];
		genders: Gender[];
		maximumDistance: number;
		likesOnly: boolean;
	};
	reports: Report[];
	flags: string[];
}

export interface IdentifiedUser extends User {
	id: string;
}

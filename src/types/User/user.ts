import { Coordinates } from "./coordinates";
import { Gender } from "./gender";
import { Location } from "./location";
import { Orientation } from "./orientation";

export interface User {
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
}

export interface IdentifiedUser extends User {
	id: string;
}

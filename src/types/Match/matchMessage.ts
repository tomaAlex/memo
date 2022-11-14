import { TimestampedElement } from "../Firebase";

export type MatchMessage = TimestampedElement & {
	author: string;
	content: string;
};

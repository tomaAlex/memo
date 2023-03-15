import { Match } from "types/Match";
import { TimestampedElement } from "../../Firebase/TimestampedElement";

export type Report = TimestampedElement & {
	user: string;
	history: Match["messages"];
	reason: string;
};

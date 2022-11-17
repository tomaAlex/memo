import { TimestampedElement } from "../Firebase";

export type MatchMessage<IsNativeTimestamp extends boolean = true> = TimestampedElement<IsNativeTimestamp> & {
	author: string;
	content: string;
};

import { TimestampedElement } from "../Firebase";

export type MatchMessage<IsNativeTimestamp extends boolean = true> = TimestampedElement<IsNativeTimestamp> &
	ObservableDocument & {
		author: string;
		content: string;
	};

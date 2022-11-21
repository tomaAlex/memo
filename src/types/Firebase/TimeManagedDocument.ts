import { LivedDocument } from "./LivedDocument";
import { TimestampedElement } from "./TimestampedElement";

export type TimeManagedDocument<
	IsNativeTimestamp extends boolean = true,
	IsNativeExpirationTimestamp extends boolean = IsNativeTimestamp
> = TimestampedElement<IsNativeTimestamp> & LivedDocument<IsNativeExpirationTimestamp>;

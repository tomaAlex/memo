import { TimestampedElement } from "./TimestampedElement";

export type UpdateManagedDocument<IsNativeTimestamp extends boolean = true> = {
	updates: { [key: string]: TimestampedElement<IsNativeTimestamp>["timestamp"] | undefined };
};

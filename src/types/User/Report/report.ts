import { Match } from "types/Match";
import { ReportReason } from "./reportReason";
import { TimestampedElement } from "../../Firebase/TimestampedElement";

export type Report = TimestampedElement & {
	user: string;
	history: Match["messages"];
	reasons: ReportReason[];
};

import { TimeManagedDocument } from "../Firebase";
import { MatchMessage } from "./matchMessage";

export type Match = TimeManagedDocument &
	ObservableDocument & {
		matchedUsers: string[];
		messages: MatchMessage[];
	};

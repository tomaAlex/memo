import { TimeManagedDocument, UpdateManagedDocument } from "../Firebase";
import { MatchMessage } from "./matchMessage";

export type Match = TimeManagedDocument &
	UpdateManagedDocument &
	ObservableDocument & {
		matchedUsers: string[];
		messages: MatchMessage[];
	};

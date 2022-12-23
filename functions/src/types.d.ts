type Coordinates = {
	latitude: number;
	longitude: number;
};

type User = {
	firstName: string;
	lastName: string;
	gender: "MALE" | "FEMALE" | "OTHER";
	birthDate: string;
	job?: string;
	school?: string;
	description?: string;
	location?: {
		city: string;
		state: string;
		country: string;
	};
	height?: number;
	orientation: "HETERO" | "HOMO" | "BI";
	photos: string[];
	likes: string[];
	dislikes: string[];
	matches: string[];
	coordinates: Coordinates;
	tokens: string[];
};

type IdentifiedUser = User & {
	id: string;
};

type LivedDocument = {
	expiresAt: firestore.Timestamp;
};

type TimestampedElement = {
	timestamp: firestore.Timestamp;
};

type TimeManagedDocument = TimestampedElement & LivedDocument;

type ObservableDocument = {
	seenBy: string[];
};

type MatchMessage = TimestampedElement &
	ObservableDocument & {
		author: string;
		content: string;
	};

type DocumentClearancePayload = {
	documentToClearPath: string;
};

type Match = TimeManagedDocument &
	ObservableDocument & {
		matchedUsers: string[];
		messages: MatchMessage[];
	};

type MatchPreview = TimeManagedDocument & {
	id: string;
	matchedUsers: IdentifiedUser[];
	lastMessage: MatchMessage | null;
	notifications: number;
};

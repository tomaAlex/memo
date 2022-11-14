type User = {
	firstName: string;
	lastName: string;
	gender: string;
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
	orientation: string;
	photos: string[];
	likes: string[];
	dislikes: string[];
	matches: string[];
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

type MatchMessage = TimestampedElement & {
	author: string;
	content: string;
};

type DocumentClearancePayload = {
	documentToClearPath: string;
};

type Match = TimeManagedDocument & {
	matchedUsers: string[];
	messages: MatchMessage[];
};

type MatchPreview = {
	id: string;
	matchedUsers: IdentifiedUser[];
	lastMessage: MatchMessage | null;
};

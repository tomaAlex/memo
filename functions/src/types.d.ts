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

type MatchMessage = {
	author: string;
	content: string;
	timestamp: firestore.Timestamp;
};

type Match = {
	matchedUsers: string[];
	messages: MatchMessage[];
	timestamp: firestore.Timestamp;
};

type MatchPreview = {
	id: string;
	matchedUsers: IdentifiedUser[];
	lastMessage: MatchMessage | null;
};

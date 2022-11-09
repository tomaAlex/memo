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

type MatchMessage = {
	sender: string;
	timestamp: string;
};

type Match = {
	matchedUsers: string[];
	messages: MatchMessage[];
	timestamp: string;
};

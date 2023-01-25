const markMessagesSeen = (messagesToBeMarkedSeen: MatchMessage[], toBeSeenBy: string): MatchMessage[] => {
	return messagesToBeMarkedSeen.map((message) => {
		const wasMessageSeen = message.seenBy.includes(toBeSeenBy) || message.author === toBeSeenBy;
		if (wasMessageSeen) {
			return message;
		}
		message.seenBy.push(toBeSeenBy);
		return message;
	});
};

export default markMessagesSeen;

const countMatchNotifications = (matchData: Match, requestingUserId: string) => {
	const { messages } = matchData;
	const wasMatchSeen = matchData.seenBy.includes(requestingUserId);

	if (messages.length === 0) {
		if (wasMatchSeen) {
			return 0;
		}
		return 1;
	}

	const unseenMessages = messages.filter(
		(message) => message.author !== requestingUserId && !message.seenBy.includes(requestingUserId)
	);
	return unseenMessages.length;
};

export default countMatchNotifications;

const getReceiverTokens = (receivers: User[]): string[] => {
	const receiverTokens = receivers.map((receiver) => receiver.tokens);
	return receiverTokens.flat();
};

export default getReceiverTokens;

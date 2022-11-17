const trimMessage = (maximumLength: number, messageToBeTrimmed: string): string => {
	if (messageToBeTrimmed.length <= maximumLength) {
		return messageToBeTrimmed;
	}

	return `${messageToBeTrimmed.slice(0, maximumLength)}...`;
};

export default trimMessage;

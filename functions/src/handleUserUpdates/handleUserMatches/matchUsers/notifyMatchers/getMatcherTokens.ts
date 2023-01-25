const getMatcherTokens = (matchers: User[]): string[] => {
	const matcherTokens = matchers.map((matcher) => matcher.tokens);
	return matcherTokens.flat();
};

export default getMatcherTokens;

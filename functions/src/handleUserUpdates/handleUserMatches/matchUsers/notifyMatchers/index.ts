import { messaging } from "firebase-admin";
import getMatchers from "./getMatchers";
import getMatcherTokens from "./getMatcherTokens";

const notifyMatchers = async (matchedUserIds: string[]): Promise<void> => {
	const matchers = await getMatchers(matchedUserIds);
	const matcherInitials = matchers.map((matcher) => matcher.firstName[0]);
	const matchersPreview = matcherInitials.join(" + ");

	await messaging().sendMulticast({
		tokens: getMatcherTokens(matchers),
		notification: {
			title: "You got a new match!",
			body: `${matchersPreview} = <3`,
		},
	});
};

export default notifyMatchers;

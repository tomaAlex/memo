import getAllowedEmailRegexExpressions from "./getAllowedEmailRegexExpressions";

const getAllowedEmailsRegexExpression = (): RegExp => {
	const allowedEmailRegexExpressions = getAllowedEmailRegexExpressions();
	const stringifiedAllowedEmailRegexExpressions = allowedEmailRegexExpressions.map(({ source }) => source);
	return new RegExp(stringifiedAllowedEmailRegexExpressions.join("|"));
};

export default getAllowedEmailsRegexExpression;

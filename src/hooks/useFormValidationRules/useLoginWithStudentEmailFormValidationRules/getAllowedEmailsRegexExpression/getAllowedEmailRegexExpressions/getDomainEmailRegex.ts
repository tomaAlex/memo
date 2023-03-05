/**
 * Given an allowed domain name, returns a regular expression that matches an email address with that domain name.
 * @param allowedDomain The allowed domain name in the email address
 * @returns RegularExpression of the form: /^[^\s@]+@kcl\.ac\.uk$/ (where kcl.ac.uk is the allowed domain name)
 *          * ^ : matches the start of the string
 *          * [^\s@]+ : matches one or more characters that are not whitespace or '@' symbol
 *          * @ : matches the '@' symbol
 *          * kcl\.ac\.uk : matches the kcl.ac.uk domain name, with each period character escaped with a backslash
 *          * $ : matches the end of the string
 */
const getDomainEmailRegex = (allowedDomain: string): RegExp => {
	const regexAllowedDomain = allowedDomain.replace(/\./g, "\\.");
	const regexAllowedDomainStringExpression = `[^\\s@]+@${regexAllowedDomain}$`;
	return new RegExp(regexAllowedDomainStringExpression);
};

export default getDomainEmailRegex;

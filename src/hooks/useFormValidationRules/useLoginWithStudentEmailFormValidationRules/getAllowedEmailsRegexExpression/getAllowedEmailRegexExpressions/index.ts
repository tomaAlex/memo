import { ALLOWED_DOMAINS } from "constants/index";
import getDomainEmailRegex from "./getDomainEmailRegex";

const getAllowedEmailRegexExpressions = (): RegExp[] => {
	return ALLOWED_DOMAINS.map(getDomainEmailRegex);
};

export default getAllowedEmailRegexExpressions;

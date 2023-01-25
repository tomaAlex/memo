const MATCH_TTL_HOURS = 24;
const MATCH_TTL_SECONDS = 60 * 60 * MATCH_TTL_HOURS;
export const MATCH_TTL_MILLISECONDS = MATCH_TTL_SECONDS * 1000;
export const MAXIMUM_MATCHES = 10;
export const INSTANT_MATCH_PENCE_PRICE = 500;
export const INSTANT_MATCH_COMMISSION_PERCENTAGE = 0.6;
export const STRIPE_CUSTOMER_METADATA_KEYS = {
	CONNECT_ACCOUNT_ID: "connectId",
};

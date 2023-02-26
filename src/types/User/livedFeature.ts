import { LivedDocument } from "../Firebase";
import { Feature } from "./feature";

export type LivedFeatureExpiration = LivedDocument<true>["expiresAt"] | null;

export type LivedFeature<Expiration extends LivedFeatureExpiration> = {
	feature: Feature;
	/**
	 * if set to null, the feature is not set to expire
	 */
	expiresAt: Expiration;
	checkedForRenewal: Expiration extends null ? true : boolean;
};

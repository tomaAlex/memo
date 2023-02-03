import { FEATURE_IDS } from "../../constants";

const getFeatureFromId = (featureId: string): Feature => {
	switch (featureId) {
		case FEATURE_IDS["BRONZE"]:
			return "BRONZE";
		default:
			throw new Error("Invalid feature id");
	}
};

export default getFeatureFromId;

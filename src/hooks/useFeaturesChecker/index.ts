import { useSelector } from "react-redux";
import { selectUpdatedFeatures } from "redux/selectors";
import { Feature } from "types/index";

export const useFeaturesChecker = () => {
	const updatedFeatures = useSelector(selectUpdatedFeatures);
	return (...featuresToCheck: Feature[]): boolean => {
		const currentFeatures = updatedFeatures.map(({ feature }) => feature);
		return featuresToCheck.every((featureToCheck) => currentFeatures.includes(featureToCheck));
	};
};

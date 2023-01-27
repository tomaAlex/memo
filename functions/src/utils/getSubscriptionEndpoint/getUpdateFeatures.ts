const getUpdateFeatures = (
	currentFeatures: LivedFeature<LivedFeatureExpiration>[],
	featureToAdd: LivedFeature<LivedFeatureExpiration>
): LivedFeature<LivedFeatureExpiration>[] => {
	return currentFeatures
		.filter(({ feature: currentlyPresentFeature }) => currentlyPresentFeature !== featureToAdd.feature)
		.concat(featureToAdd);
};

export default getUpdateFeatures;

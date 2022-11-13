const { getDefaultConfig } = require("metro-config");

const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

exports.transformer = {
	babelTransformerPath: require.resolve("react-native-sass-transformer"),
};

exports.resolver = {
	...defaultResolver,
	sourceExts: [...defaultResolver.sourceExts, "cjs", "scss", "sass"],
};

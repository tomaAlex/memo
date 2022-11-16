const { getDefaultConfig } = require("metro-config");

const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();

exports.transformer = {
	babelTransformerPath: require.resolve("./customTransformer.js"),
};

exports.resolver = {
	...defaultResolver,
	assetExts: defaultResolver.assetExts.filter((ext) => ext !== "scss" && ext !== "svg"),
	sourceExts: [...defaultResolver.sourceExts, "cjs", "scss", "sass", "svg"],
};

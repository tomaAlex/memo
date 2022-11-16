var sassTransformer = require("react-native-sass-transformer");
var svgTransformer = require("react-native-svg-transformer");

module.exports.transform = function ({ src, filename, options }) {
	if (filename.endsWith(".scss") || filename.endsWith(".sass")) {
		return sassTransformer.transform({ src, filename, options });
	}
	return svgTransformer.transform({ src, filename, options });
};

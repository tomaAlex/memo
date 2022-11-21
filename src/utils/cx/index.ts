import { StyleProp } from "react-native";
import isPossibleStyleTuple from "./isPossibleStyleTuple";
import PossibleStyleTuple from "./PossibleStyleTuple";

export const cx = <T>(...possibleStyles: (PossibleStyleTuple<T> | StyleProp<T>)[]): StyleProp<T> | null => {
	if (possibleStyles.length === 0) {
		return null;
	}
	return possibleStyles.map((possibleStyle) => {
		const isGuaranteedStyle = !isPossibleStyleTuple(possibleStyle);
		if (isGuaranteedStyle) {
			return possibleStyle as StyleProp<T>;
		}
		const [style, shouldApply] = possibleStyle as PossibleStyleTuple<T>;
		return shouldApply ? style : null;
	});
};

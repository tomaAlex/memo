import { StyleProp } from "react-native";
import PossibleStyleTuple from "./PossibleStyleTuple";

const isPossibleStyleTuple = <T>(possiblyStyleTuple: PossibleStyleTuple<T> | StyleProp<T>): boolean => {
	if (!Array.isArray(possiblyStyleTuple)) {
		return false;
	}
	if (possiblyStyleTuple.length !== 2) {
		return false;
	}
	if (typeof possiblyStyleTuple[1] !== "boolean") {
		return false;
	}
	return true;
};

export default isPossibleStyleTuple;

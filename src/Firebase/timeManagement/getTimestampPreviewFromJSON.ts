import { JSONTimestamp } from "types/Firebase/JSONTimestamp";
import { getTimestampFromJSON } from "./getTimestampFromJSON";
import { getTimestampPreview } from "./getTimestampPreview";

export const getTimestampPreviewFromJSON = (timestamp: JSONTimestamp): string => {
	const realTimestamp = getTimestampFromJSON(timestamp);
	return getTimestampPreview(realTimestamp);
};

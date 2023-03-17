import { setMemoryItem } from "utils";
import { MemoryIDs } from "types/index";

export const acceptEULA = async (setAcceptedEULA: (acceptedEULA: boolean) => void): Promise<void> => {
	setAcceptedEULA(true);
	await setMemoryItem(MemoryIDs.ACCEPTED_EULA, true);
};

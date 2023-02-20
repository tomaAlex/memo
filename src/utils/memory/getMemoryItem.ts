import { MemoryIDs, StoredMemories } from "types/index";
import AsyncStorage from "@react-native-community/async-storage";

export const getMemoryItem = async <T extends MemoryIDs>(key: T): Promise<StoredMemories<T> | undefined> => {
	const savedData = await AsyncStorage.getItem(key);
	if (savedData === null) {
		return undefined;
	}
	const parsedSavedData = (await JSON.parse(savedData)) as StoredMemories<T>;
	return parsedSavedData;
};

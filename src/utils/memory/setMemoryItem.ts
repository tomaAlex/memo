import { MemoryIDs, StoredMemories } from "types/index";
import AsyncStorage from "@react-native-community/async-storage";

export const setMemoryItem = async <MemoryID extends MemoryIDs>(
	key: MemoryID,
	value: StoredMemories<MemoryID>
): Promise<void> => AsyncStorage.setItem(key, JSON.stringify(value));

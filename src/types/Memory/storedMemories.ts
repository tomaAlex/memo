import { MemoryIDs } from "./memoryIds";

export type StoredMemories<MemoryID extends MemoryIDs> = MemoryID extends MemoryIDs.SHOWED_TUTORIAL ? boolean : never;

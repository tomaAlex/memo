import { getMemoryItem, setMemoryItem } from "utils/index";
import { MainScreenNames, MemoryIDs, ScreenNames, ScreenProps } from "types/index";

export const handleTutorialDisplaying = async (
	navigation: ScreenProps<MainScreenNames.Feed>["navigation"]
): Promise<void> => {
	const showedTutorial = await getMemoryItem(MemoryIDs.SHOWED_TUTORIAL);
	if (showedTutorial) {
		return;
	}
	await setMemoryItem(MemoryIDs.SHOWED_TUTORIAL, true);
	navigation.navigate(ScreenNames.Tutorial);
};

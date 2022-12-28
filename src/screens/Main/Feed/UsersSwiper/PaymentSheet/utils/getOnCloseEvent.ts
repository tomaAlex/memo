import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import checkInstantMatchCreation from "./checkInstantMatchCreation";

const getOnCloseEvent = (
	// userToHaveInstantlyMatchedId: string,
	wasBottomSheetPrematurelyClosed: boolean,
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>,
	setIsSwiperBlocked: (isSwiperBlocked: boolean) => void
) => {
	return () => {
		if (!wasBottomSheetPrematurelyClosed) {
			return;
		}
		// const { current } = swiperReference;
		// if (!current) {
		// 	return;
		// }
		// const wasInstantMatchCreated = await checkInstantMatchCreation(userToHaveInstantlyMatchedId);
		const unlockSwiper = () => setIsSwiperBlocked(false);
		// if (wasInstantMatchCreated) {
		// 	unlockSwiper();
		// }
		swiperReference.current?.swipeBack(unlockSwiper);
	};
};

export default getOnCloseEvent;

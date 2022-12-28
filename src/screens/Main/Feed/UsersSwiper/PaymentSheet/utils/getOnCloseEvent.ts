import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";

const getOnCloseEvent = (
	wasBottomSheetPrematurelyClosed: boolean,
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>,
	setIsSwiperBlocked: (isSwiperBlocked: boolean) => void
) => {
	return () => {
		if (!wasBottomSheetPrematurelyClosed) {
			return;
		}
		const unlockSwiper = () => setIsSwiperBlocked(false);
		swiperReference.current?.swipeBack(unlockSwiper);
	};
};

export default getOnCloseEvent;

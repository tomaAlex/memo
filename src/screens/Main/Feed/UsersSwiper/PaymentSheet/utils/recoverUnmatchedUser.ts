import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";

const recoverUnmatchedUser = (
	wasBottomSheetPrematurelyClosed: boolean,
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>,
	setIsSwiperBlocked: (isSwiperBlocked: boolean) => void,
	setSwipedAllUsers: (swipedAllUsers: boolean) => void,
) => {
	if (!wasBottomSheetPrematurelyClosed) {
		return;
	}
	const unlockSwiper = () => setIsSwiperBlocked(false);
	swiperReference.current?.swipeBack(unlockSwiper);
	setSwipedAllUsers(false);
};

export default recoverUnmatchedUser;

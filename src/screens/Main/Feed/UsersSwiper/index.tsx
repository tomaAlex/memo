import React, { useRef, useState } from "react";
import { IdentifiedUser } from "types/index";
import Swiper from "react-native-deck-swiper";
import FeedUserCard from "./FeedUserCard";
import { useInAppInteractionsUpdater, useProfileDisliker, useProfileLiker } from "hooks/index";
import getVerticalState from "./utils/getVerticalState";
import RBSheet from "react-native-raw-bottom-sheet";
import PaymentSheet from "./PaymentSheet";
import UsersSwiperContext from "./UsersSwiperContext";
import RefreshFeedButton from "../RefreshFeedButton";

type TProps = {
	recommendations: IdentifiedUser[];
	refreshFeed: () => void;
};

const UsersSwiper = ({ recommendations, refreshFeed }: TProps) => {
	const refRBSheet = useRef<RBSheet>(null);
	const swiperReference = useRef<Swiper<IdentifiedUser>>(null);
	const [isSwiperBlocked, setIsSwiperBlocked] = useState(false);
	const [userToInstantlyMatchId, setUserToInstantlyMatchId] = useState<string>(recommendations[0].id);
	const [currentlyDisplayedUserIndex, setCurrentlyDisplayedUserIndex] = useState(0);
	const [swipedAllUsers, setSwipedAllUsers] = useState(false);
	const increaseInAppInteractions = useInAppInteractionsUpdater("increment");

	const likeProfile = useProfileLiker();
	const dislikeProfile = useProfileDisliker();

	return (
		<UsersSwiperContext.Provider
			value={{ swiperReference, isSwiperBlocked, setIsSwiperBlocked, userToInstantlyMatchId, setSwipedAllUsers }}
		>
			<Swiper<IdentifiedUser>
				ref={swiperReference}
				backgroundColor="white"
				cards={recommendations}
				renderCard={(userToDisplay) => <FeedUserCard {...{ userToDisplay }} />}
				onSwiped={(userIndex) => {
					setCurrentlyDisplayedUserIndex(userIndex + 1);
					increaseInAppInteractions();
				}}
				onSwipedRight={(userIndex) => {
					const likedUser = recommendations[userIndex];
					likeProfile(likedUser.id);
				}}
				onSwipedTop={(userIndex) => {
					setUserToInstantlyMatchId(recommendations[userIndex].id);
					refRBSheet.current?.open();
				}}
				onSwipedLeft={(userIndex) => {
					const dislikedUser = recommendations[userIndex];
					dislikeProfile(dislikedUser.id);
				}}
				onSwipedAll={() => {
					setSwipedAllUsers(true);
				}}
				horizontalSwipe={!isSwiperBlocked}
				verticalSwipe={!isSwiperBlocked && getVerticalState(currentlyDisplayedUserIndex, recommendations)}
				cardIndex={0}
				stackSize={1}
			/>
			<RefreshFeedButton
				refreshFeed={() => {
					refreshFeed();
					setCurrentlyDisplayedUserIndex(0);
				}}
				{...{ swipedAllUsers }}
			/>
			<PaymentSheet {...{ refRBSheet }} />
		</UsersSwiperContext.Provider>
	);
};

export default React.memo(UsersSwiper);

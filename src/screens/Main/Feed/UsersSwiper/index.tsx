import React, { useEffect, useRef, useState } from "react";
import { IdentifiedUser } from "types/index";
import Swiper from "react-native-deck-swiper";
import FeedUserCard from "./FeedUserCard";
import { useInAppInteractionsUpdater, useProfileDisliker, useProfileLiker } from "hooks/index";
import getVerticalState from "./utils/getVerticalState";
import RBSheet from "react-native-raw-bottom-sheet";
import PaymentSheet from "./PaymentSheet";
import UsersSwiperContext from "./UsersSwiperContext";
import RefreshFeedButton from "../RefreshFeedButton";
import overlayLabels from "./overlayLabels";

type TProps = {
	recommendations: IdentifiedUser[];
	expandRecommendations: () => void;
};

const UsersSwiper = ({ recommendations, expandRecommendations }: TProps) => {
	const refRBSheet = useRef<RBSheet>(null);
	const swiperReference = useRef<Swiper<IdentifiedUser>>(null);
	const [isSwiperBlocked, setIsSwiperBlocked] = useState(false);
	const [userToInstantlyMatchId, setUserToInstantlyMatchId] = useState<string>(recommendations[0].id);
	const [currentlyDisplayedUserIndex, setCurrentlyDisplayedUserIndex] = useState(0);
	const [swipedAllUsers, setSwipedAllUsers] = useState(false);
	const increaseInAppInteractions = useInAppInteractionsUpdater("increment");
	const hasJustLoaded = useRef<boolean>(true);

	const likeProfile = useProfileLiker();
	const dislikeProfile = useProfileDisliker();

	useEffect(() => {
		if (hasJustLoaded.current) {
			hasJustLoaded.current = false;
			return;
		}
		swiperReference.current?.jumpToCardIndex(recommendations.length - 1);
		setCurrentlyDisplayedUserIndex(recommendations.length - 1);
	}, [recommendations]);

	return (
		<UsersSwiperContext.Provider
			value={{ swiperReference, isSwiperBlocked, setIsSwiperBlocked, userToInstantlyMatchId, setSwipedAllUsers }}
		>
			<Swiper<IdentifiedUser>
				ref={swiperReference}
				backgroundColor="white"
				cards={recommendations}
				cardStyle={{ flex: 1, width: "100%", height: "100%", top: 0, left: 0 }}
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
				onSwipedBottom={() => {
					swiperReference.current?.swipeBack();
				}}
				onSwipedAll={() => {
					expandRecommendations();
				}}
				horizontalSwipe={!isSwiperBlocked}
				verticalSwipe={!isSwiperBlocked && getVerticalState(currentlyDisplayedUserIndex, recommendations)}
				cardIndex={0}
				stackSize={1}
				animateCardOpacity
				animateOverlayLabelsOpacity
				{...{ overlayLabels }}
			/>
			<RefreshFeedButton
				refreshFeed={() => {
					// refreshFeed();
					expandRecommendations();
					setCurrentlyDisplayedUserIndex(0);
				}}
				{...{ swipedAllUsers }}
			/>
			<PaymentSheet {...{ refRBSheet }} />
		</UsersSwiperContext.Provider>
	);
};

export default React.memo(UsersSwiper);

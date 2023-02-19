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
import { Dimensions } from "react-native";

type TProps = {
	recommendations: IdentifiedUser[];
	expandRecommendations: () => void;
	resetRecommendations: () => void;
};

const UsersSwiper = ({ recommendations, expandRecommendations, resetRecommendations }: TProps) => {
	const refRBSheet = useRef<RBSheet>(null);
	const swiperReference = useRef<Swiper<IdentifiedUser>>(null);
	const [isSwiperBlocked, setIsSwiperBlocked] = useState(false);
	const [userToInstantlyMatchId, setUserToInstantlyMatchId] = useState<string>(recommendations[0].id);
	const [currentlyDisplayedUserIndex, setCurrentlyDisplayedUserIndex] = useState(0);
	const [swipedAllUsers, setSwipedAllUsers] = useState(false);
	const increaseInAppInteractions = useInAppInteractionsUpdater("increment");
	const hasJustLoaded = useRef<boolean>(true);
	const preventedFeedExhaustionMarkingTimeout = useRef<boolean>(false);
	const feedExhaustionMarkingTimeout = useRef<NodeJS.Timeout | null>(null);
	const { width, height } = Dimensions.get("screen");

	const likeProfile = useProfileLiker();
	const dislikeProfile = useProfileDisliker();

	useEffect(() => {
		if (hasJustLoaded.current) {
			hasJustLoaded.current = false;
			return;
		}
		if (feedExhaustionMarkingTimeout.current) {
			// a new recommendation came through, the feed is not exhausted yet
			// so make sure to clear the planned action of marking it as exhausted
			clearTimeout(feedExhaustionMarkingTimeout.current);
		}
		swiperReference.current?.jumpToCardIndex(recommendations.length - 1);
		setCurrentlyDisplayedUserIndex(recommendations.length - 1);
	}, [recommendations]);

	const markFeedExhaustionTimeout = () => {
		feedExhaustionMarkingTimeout.current = setTimeout(() => {
			setSwipedAllUsers(true);
		}, 5000);
	};

	useEffect(() => {
		if (!isSwiperBlocked || !feedExhaustionMarkingTimeout.current) {
			return;
		}
		clearTimeout(feedExhaustionMarkingTimeout.current);
		preventedFeedExhaustionMarkingTimeout.current = true;
	}, [isSwiperBlocked]);

	useEffect(() => {
		const isFeedExhausted = currentlyDisplayedUserIndex > recommendations.length - 1;
		if (isSwiperBlocked || !isFeedExhausted || !preventedFeedExhaustionMarkingTimeout.current) {
			return;
		}
		markFeedExhaustionTimeout();
		preventedFeedExhaustionMarkingTimeout.current = false;
	}, [currentlyDisplayedUserIndex, isSwiperBlocked, recommendations.length]);

	useEffect(() => {
		const isFeedExhausted = currentlyDisplayedUserIndex > recommendations.length - 1;
		if (!isSwiperBlocked || !isFeedExhausted) {
			return;
		}
		setCurrentlyDisplayedUserIndex(recommendations.length - 1);
	}, [currentlyDisplayedUserIndex, isSwiperBlocked, recommendations.length]);

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
					markFeedExhaustionTimeout();
				}}
				horizontalSwipe={!isSwiperBlocked}
				verticalSwipe={!isSwiperBlocked && getVerticalState(currentlyDisplayedUserIndex, recommendations)}
				cardIndex={0}
				stackSize={1}
				animateCardOpacity
				animateOverlayLabelsOpacity
				overlayOpacityVerticalThreshold={10}
				overlayOpacityHorizontalThreshold={10}
				inputOverlayLabelsOpacityRangeX={[-width / 5, -width / 10, 0, width / 10, width / 5]}
				inputOverlayLabelsOpacityRangeY={[-height / 10, -height / 20, 0, height / 20, height / 10]}
				{...{ overlayLabels }}
			/>
			<RefreshFeedButton
				refreshFeed={() => {
					// refreshFeed();
					// expandRecommendations();
					resetRecommendations();
					setCurrentlyDisplayedUserIndex(0);
				}}
				{...{ swipedAllUsers }}
			/>
			<PaymentSheet {...{ refRBSheet }} />
		</UsersSwiperContext.Provider>
	);
};

export default React.memo(UsersSwiper);

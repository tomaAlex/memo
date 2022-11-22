import React, { useRef } from "react";
import { IdentifiedUser } from "types/index";
import Swiper from "react-native-deck-swiper";
import FeedUserCard from "./FeedUserCard";
import { useProfileDisliker, useProfileLiker } from "hooks/index";

type TProps = {
	recommendations: IdentifiedUser[];
};

const UsersSwiper = ({ recommendations }: TProps) => {
	const swiperReference = useRef<Swiper<IdentifiedUser>>(null);

	const likeProfile = useProfileLiker();
	const dislikeProfile = useProfileDisliker();

	return (
		<Swiper<IdentifiedUser>
			ref={swiperReference}
			backgroundColor="white"
			cards={recommendations}
			renderCard={(userToDisplay) => <FeedUserCard {...{ userToDisplay, swiperReference }} />}
			onSwipedRight={(userIndex) => {
				const likedUser = recommendations[userIndex];
				likeProfile(likedUser.id);
			}}
			onSwipedLeft={(userIndex) => {
				const dislikedUser = recommendations[userIndex];
				dislikeProfile(dislikedUser.id);
			}}
			// onSwipedAll={() => {
			// 	Alert.alert("Fetching more recommendations!");
			// }}
			verticalSwipe={false}
			cardIndex={0}
			stackSize={1}
		/>
	);
};

export default React.memo(UsersSwiper);

import { useMatchPreviewLoader, useProfileDisliker, useProfileLiker, useSnapshot } from "hooks/index";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import Swiper from "react-native-deck-swiper";
import { MainScreenNames, ScreenProps, IdentifiedUser, User } from "types/index";
import connector from "../../../redux/connector";
import FeedUserCard from "./FeedUserCard";
import MatchedNote from "./MatchedNote";
import fetchRecommendations from "./utils/fetchRecommendations";

const Feed = ({
	user,
	updateUser,
	route: {
		params: { uid },
	},
	matchPreviews,
	updateAllMatchPreviews,
	navigation,
}: ScreenProps<MainScreenNames.Feed>) => {
	const [userData] = useSnapshot<User>("users", uid ? uid : user.id);
	useMatchPreviewLoader(user, updateAllMatchPreviews);

	useEffect(() => {
		if (!userData) {
			return;
		}
		// keep user state in redux updated with the latest data state
		updateUser(userData);
	}, [userData, updateUser]);

	const likeProfile = useProfileLiker();
	const dislikeProfile = useProfileDisliker();

	const [recommendations, setRecommendations] = useState([] as IdentifiedUser[]);
	const areRecommendationsLoading = recommendations.length === 0;
	const areDependenciesLoading = areRecommendationsLoading;

	const loadDependencies = () => {
		fetchRecommendations().then((userRecommendations) => {
			setRecommendations(userRecommendations);
		});
	};

	useEffect(loadDependencies, []);

	const swiperReference = useRef<Swiper<IdentifiedUser>>(null);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
			<MatchedNote {...{ matchPreviews, navigation }} />
			{areDependenciesLoading ? (
				<Text>fetching recommendations...</Text>
			) : (
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
			)}
		</SafeAreaView>
	);
};

export default connector(Feed);

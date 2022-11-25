import { MAXIMUM_MATCHES } from "constants/index";
import { useMatchPreviewLoader, useSnapshot } from "hooks/index";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { MainScreenNames, ScreenProps, IdentifiedUser, User } from "types/index";
import connector from "../../../redux/connector";
import EnoughMatchesNote from "./EnoughMatchesNote";
import MatchedNote from "./MatchedNote";
import UsersSwiper from "./UsersSwiper";
import fetchRecommendations from "./utils/fetchRecommendations";
import styles from "./Feed.module.scss";

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

	const [recommendations, setRecommendations] = useState([] as IdentifiedUser[]);
	const hasMaximumMatches = matchPreviews.length >= MAXIMUM_MATCHES;
	const hasEnoughMatches = recommendations.length === 0 || hasMaximumMatches;
	const [exhaustedFeed, setExhaustedFeed] = useState(false);

	const loadDependencies = () => {
		fetchRecommendations().then((userRecommendations) => {
			setRecommendations(userRecommendations);
		});
	};

	useEffect(loadDependencies, []);

	return (
		<SafeAreaView style={styles.container}>
			<MatchedNote {...{ matchPreviews, navigation }} />
			{hasEnoughMatches || exhaustedFeed ? (
				<EnoughMatchesNote />
			) : (
				<UsersSwiper {...{ recommendations, markFeedExhausted: () => setExhaustedFeed(true) }} />
			)}
		</SafeAreaView>
	);
};

export default connector(Feed);

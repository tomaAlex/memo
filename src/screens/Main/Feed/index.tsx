import { useMatchPreviewLoader, useSnapshot } from "hooks/index";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { MainScreenNames, ScreenProps, IdentifiedUser, User } from "types/index";
import connector from "../../../redux/connector";
import MatchedNote from "./MatchedNote";
import UsersSwiper from "./UsersSwiper";
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

	const [recommendations, setRecommendations] = useState([] as IdentifiedUser[]);
	const areRecommendationsLoading = recommendations.length === 0;
	const areDependenciesLoading = areRecommendationsLoading;

	const loadDependencies = () => {
		fetchRecommendations().then((userRecommendations) => {
			setRecommendations(userRecommendations);
		});
	};

	useEffect(loadDependencies, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
			<MatchedNote {...{ matchPreviews, navigation }} />
			{areDependenciesLoading ? <Text>fetching recommendations...</Text> : <UsersSwiper {...{ recommendations }} />}
		</SafeAreaView>
	);
};

export default connector(Feed);

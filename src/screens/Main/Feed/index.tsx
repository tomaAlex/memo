import { MAXIMUM_MATCHES } from "constants/index";
import { useMatchPreviewLoader, useSnapshot } from "hooks/index";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { MainScreenNames, ScreenProps, IdentifiedUser, User } from "types/index";
import connector from "../../../redux/connector";
import EnoughMatchesNote from "./EnoughMatchesNote";
import MatchedNote from "./MatchedNote";
import UsersSwiper from "./UsersSwiper";
import fetchRecommendations from "./utils/fetchRecommendations";
import styles from "./Feed.module.scss";
import markDeviceToken from "./utils/markDeviceToken";
import FeedLoading from "Loading/FeedLoading";
import SearchFiltersButton from "./SearchFiltersButton";
import SearchFiltersModal from "./SearchFiltersModal";

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

	const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
	const [recommendations, setRecommendations] = useState([] as IdentifiedUser[]);
	const [shouldFetchRecommendations, setShouldFetchRecommendations] = useState(true);
	const [loadingRecommendations, setLoadingRecommendations] = useState(true);
	const hasMaximumMatches = matchPreviews.length >= MAXIMUM_MATCHES;
	const refreshFeed = () => {
		setShouldFetchRecommendations(true);
	};

	const loadDependencies = async () => {
		markDeviceToken();
		setLoadingRecommendations(true);
		const userRecommendations = await fetchRecommendations();
		setLoadingRecommendations(false);
		setRecommendations(userRecommendations);
	};

	useEffect(() => {
		if (!shouldFetchRecommendations) {
			return;
		}
		loadDependencies();
		setShouldFetchRecommendations(false);
	}, [shouldFetchRecommendations]);

	if (loadingRecommendations || recommendations.length === 0) {
		return (
			<View style={styles.loadingContainer}>
				<FeedLoading heigth={350} width={350} />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<MatchedNote {...{ matchPreviews, navigation }} />
			{hasMaximumMatches ? (
				<EnoughMatchesNote />
			) : (
				<View style={styles.container__swiperContainer}>
					<SearchFiltersButton showFiltersModal={() => setIsFiltersModalVisible(true)} />
					<UsersSwiper {...{ recommendations, refreshFeed }} />
					<SearchFiltersModal visible={isFiltersModalVisible} onRequestClose={() => setIsFiltersModalVisible(false)} />
				</View>
			)}
		</SafeAreaView>
	);
};

export default connector(Feed);

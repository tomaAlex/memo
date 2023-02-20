import { MAXIMUM_MATCHES } from "constants/index";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import connector from "../../../redux/connector";
import EnoughMatchesNote from "./EnoughMatchesNote";
import MatchedNote from "./MatchedNote";
import UsersSwiper from "./UsersSwiper";
import styles from "./Feed.module.scss";
import markDeviceToken from "./utils/markDeviceToken";
import FeedLoading from "Loading/FeedLoading";
import SearchFiltersButton from "./SearchFiltersButton";
import SearchFiltersModal from "./SearchFiltersModal";
import { MainScreenNames, ScreenProps, User } from "types/index";
import { useExpandableRecommendations, useMatchPreviewLoader, useSnapshot } from "hooks/index";
import handleTutorialDisplaying from "./utils/handleTutorialDisplaying";

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
	const openedLoadingAnimationSize = 350;
	const [loadingAnimationSize, setLoadingAnimationSize] = useState(openedLoadingAnimationSize);
	useMatchPreviewLoader(user, updateAllMatchPreviews);

	useEffect(() => {
		if (!userData) {
			return;
		}
		// keep user state in redux updated with the latest data state
		updateUser(userData);
	}, [userData, updateUser]);

	const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
	const [filteredRecommendations, expandFilteredRecommendations, resetFilteredRecommendations] =
		useExpandableRecommendations();
	const loadingRecommendations = filteredRecommendations.length === 0;
	const hasMaximumMatches = matchPreviews.length >= MAXIMUM_MATCHES;

	const loadDependencies = useCallback(async () => {
		markDeviceToken();
		handleTutorialDisplaying(navigation);
	}, [navigation]);

	useEffect(() => {
		loadDependencies();
	}, [loadDependencies]);

	if (loadingRecommendations) {
		return (
			<View style={styles.loadingContainer}>
				<SearchFiltersButton
					color="#F10065"
					fill="#F10065"
					showFiltersModal={() => {
						setLoadingAnimationSize(0);
						setIsFiltersModalVisible(true);
					}}
					top="10%"
				/>
				<FeedLoading heigth={loadingAnimationSize} width={loadingAnimationSize} />
				<SearchFiltersModal
					visible={isFiltersModalVisible}
					onRequestClose={() => {
						setLoadingAnimationSize(openedLoadingAnimationSize);
						setIsFiltersModalVisible(false);
					}}
					resetRecommendations={resetFilteredRecommendations}
				/>
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
					<UsersSwiper
						recommendations={filteredRecommendations}
						expandRecommendations={expandFilteredRecommendations}
						resetRecommendations={resetFilteredRecommendations}
					/>
					<SearchFiltersModal
						visible={isFiltersModalVisible}
						onRequestClose={() => setIsFiltersModalVisible(false)}
						resetRecommendations={resetFilteredRecommendations}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

export default connector(Feed);

import { MAXIMUM_MATCHES } from "constants/index";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import connector from "../../../redux/connector";
import EnoughMatchesNote from "./EnoughMatchesNote";
import MatchedNote from "./MatchedNote";
import UsersSwiper from "./UsersSwiper";
import styles from "./Feed.module.scss";
import FeedLoading from "Loading/FeedLoading";
// import SearchFiltersButton from "./SearchFiltersButton";
import { handleTutorialDisplaying, markDeviceToken, getFlaggingConfirmation } from "./utils";
import OverlaidRecommendationButtons from "./OverlaidRecommendationButtons";
// import SearchFiltersModal from "./SearchFiltersModal";
import { IdentifiedUser, MainScreenNames, ScreenProps, User } from "types/index";
import { useExpandableRecommendations, useMatchPreviewLoader, useSnapshot } from "hooks/index";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import TimedOutNote from "./TimedOutNote";

const Feed = ({
	user,
	updateUser,
	route: {
		params: { uid },
	},
	matchPreviews,
	updateAllMatchPreviews,
	navigation,
	setExpandableRecommendations,
}: ScreenProps<MainScreenNames.Feed>) => {
	const [userData] = useSnapshot<User>("users", uid ? uid : user.id);
	// const openedLoadingAnimationSize = 350;
	const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");
	// const [loadingAnimationSize, setLoadingAnimationSize] = useState(openedLoadingAnimationSize);
	// const [loadingAnimationSize] = useState(openedLoadingAnimationSize);
	const [translateFlaggingNotes] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.FlaggingModal" });
	const [currentlyDisplayedUser, setCurrentlyDisplayedUser] = useState<IdentifiedUser | null>(null);
	useMatchPreviewLoader(user, updateAllMatchPreviews);

	useEffect(() => {
		if (!userData) {
			return;
		}
		// keep user state in redux updated with the latest data state
		updateUser(userData);
	}, [userData, updateUser]);

	// const [isFiltersModalVisible, setIsFiltersModalVisible] = useState(false);
	// const [filteredRecommendations, expandFilteredRecommendations, resetFilteredRecommendations] =
	// 	useExpandableRecommendations();
	const expandableRecommendations = useExpandableRecommendations();

	useEffect(() => {
		// giving access to the recommendations controller to the other components is useful
		setExpandableRecommendations(expandableRecommendations);
		// do not add any dependencies here, otherwise it will cause an infinite loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setExpandableRecommendations]);

	const loadingTimeout = 15000;
	const [hasTimedOut, setHasTimedOut] = useState(false);
	const scheduledTimeoutMarker = useRef<NodeJS.Timeout | null>(null);
	const [filteredRecommendations, expandFilteredRecommendations, resetFilteredRecommendations] =
		expandableRecommendations;
	const loadingRecommendations = filteredRecommendations.length === 0;
	const hasMaximumMatches = matchPreviews.length >= MAXIMUM_MATCHES;

	useEffect(() => {
		setHasTimedOut(false);
		if (!loadingRecommendations) {
			if (scheduledTimeoutMarker.current) {
				clearTimeout(scheduledTimeoutMarker.current);
			}
			return;
		}
		scheduledTimeoutMarker.current = setTimeout(() => {
			setHasTimedOut(true);
		}, loadingTimeout);
	}, [loadingRecommendations]);

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
				{/* <SearchFiltersButton
					color="#F10065"
					fill="#F10065"
					showFiltersModal={() => {
						setLoadingAnimationSize(0);
						setIsFiltersModalVisible(true);
					}}
					top="10%"
				/> */}
				<OverlaidRecommendationButtons
					top="10%"
					// searchFiltersButtonProps={{
					// 	color: "#F10065",
					// 	fill: "#F10065",
					// 	showFiltersModal: () => {
					// 		setLoadingAnimationSize(0);
					// 		setIsFiltersModalVisible(true);
					// 	},
					// }}
				/>
				{!hasTimedOut ? <FeedLoading heigth={screenWidth / 2} width={screenWidth / 2} /> : <TimedOutNote />}
				{/* <SearchFiltersModal
					visible={isFiltersModalVisible}
					onRequestClose={() => {
						setLoadingAnimationSize(openedLoadingAnimationSize);
						setIsFiltersModalVisible(false);
					}}
					resetRecommendations={resetFilteredRecommendations}
				/> */}
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
					{/* <SearchFiltersButton showFiltersModal={() => setIsFiltersModalVisible(true)} /> */}
					<OverlaidRecommendationButtons
						// searchFiltersButtonProps={{
						// 	showFiltersModal: () => setIsFiltersModalVisible(true),
						// }}
						flagButtonProps={{
							showFlaggingModal: () =>
								getFlaggingConfirmation(translateFlaggingNotes, currentlyDisplayedUser, resetFilteredRecommendations),
						}}
					/>
					<UsersSwiper
						recommendations={filteredRecommendations}
						expandRecommendations={expandFilteredRecommendations}
						resetRecommendations={resetFilteredRecommendations}
						{...{ setCurrentlyDisplayedUser }}
					/>
					{/* <SearchFiltersModal
						visible={isFiltersModalVisible}
						onRequestClose={() => setIsFiltersModalVisible(false)}
						resetRecommendations={resetFilteredRecommendations}
					/> */}
				</View>
			)}
		</SafeAreaView>
	);
};

export default connector(Feed);

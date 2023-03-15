import React from "react";
import { View } from "react-native";
import { IdentifiedUser } from "types/index";
import styles from "./MatchChatProfilePreview.module.scss";
import BackNavigationSection from "./BackNavigationSection";
import MatchReportingSection from "./MatchReportingSection";
import TimedMatchChatUserPreview from "./TimedMatchChatUserPreview";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import MatchChatProfilePreviewContext from "./MatchChatProfilePreviewContext";

type TProps = {
	matchId: string;
	userToPreview: IdentifiedUser;
	matchTimestamp: FirebaseFirestoreTypes.Timestamp;
	expiresAt: FirebaseFirestoreTypes.Timestamp;
};

const MatchChatProfilePreview = ({ userToPreview, expiresAt, matchId }: TProps) => {
	return (
		<View style={styles.container}>
			<BackNavigationSection />
			<TimedMatchChatUserPreview {...{ userToPreview, expiresAt }} />
			<MatchChatProfilePreviewContext.Provider value={{ userToReportId: userToPreview.id, historyMatchId: matchId }}>
				<MatchReportingSection />
			</MatchChatProfilePreviewContext.Provider>
		</View>
	);
};

export default React.memo(MatchChatProfilePreview);

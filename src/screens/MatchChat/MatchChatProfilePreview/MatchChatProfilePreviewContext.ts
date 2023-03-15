import React from "react";

const MatchChatProfilePreviewContext = React.createContext<{
	userToReportId: string;
	historyMatchId: string;
}>({
	userToReportId: "",
	historyMatchId: "",
});

export default MatchChatProfilePreviewContext;

import { ReportReason } from "types/index";
import { firebase } from "@react-native-firebase/functions";

const reportMatch = async (userToReportId: string, historyMatchId: string, reasons: ReportReason[]): Promise<void> => {
	await firebase.functions().httpsCallable("reportMatch")({ matchId: historyMatchId, userId: userToReportId, reasons });
};

export default reportMatch;

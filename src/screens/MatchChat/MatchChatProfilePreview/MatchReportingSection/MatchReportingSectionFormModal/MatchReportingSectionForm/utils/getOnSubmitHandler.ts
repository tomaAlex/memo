import React from "react";
import { Formik } from "formik";
import { TFunction } from "i18next";
import { ReportReason, ScreenNames, ScreenProps } from "types/index";
import reportMatch from "./reportMatch";

export const getOnSubmitHandler = (
	translateErrors: TFunction,
	userToReportId: string,
	historyMatchId: string,
	setIsReporting: (isReporting: boolean) => void,
	navigation: ScreenProps<ScreenNames.MatchChat>["navigation"],
	closeForm: () => void
): React.ComponentProps<
	typeof Formik<{
		behavior: boolean;
		scam: boolean;
		harassment: boolean;
		safety: boolean;
		guidelines: boolean;
		misrepresentation: boolean;
		offTopic: boolean;
		other: boolean;
	}>
>["onSubmit"] => {
	return async (
		{ behavior, scam, harassment, safety, guidelines, misrepresentation, offTopic, other },
		{ setErrors }
	) => {
		setIsReporting(true);
		const reportReasons = [] as ReportReason[];
		if (behavior) reportReasons.push(ReportReason.BEHAVIOR);
		if (scam) reportReasons.push(ReportReason.SCAM);
		if (harassment) reportReasons.push(ReportReason.HARASSMENT);
		if (safety) reportReasons.push(ReportReason.SAFETY);
		if (guidelines) reportReasons.push(ReportReason.GUIDELINES);
		if (misrepresentation) reportReasons.push(ReportReason.MISREPRESENTATION);
		if (offTopic) reportReasons.push(ReportReason.OFF_TOPIC);
		if (other) reportReasons.push(ReportReason.OTHER);
		if (reportReasons.length === 0) {
			setIsReporting(false);
			setErrors({
				other: translateErrors("General.required"),
			});
			return;
		}
		await reportMatch(userToReportId, historyMatchId, reportReasons);
		setIsReporting(false);
		closeForm();
		navigation.goBack();
	};
};

export const getHoursAndMinutesPreview = (dateToPreviewHoursAndMinutes: Date): string => {
	const timestampPreviewWithSeconds = dateToPreviewHoursAndMinutes.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});
	return timestampPreviewWithSeconds.slice(0, -3);
};

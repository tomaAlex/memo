import { IdentificationForm, ScreenNames, ScreenProps } from "types/index";
import getLocationFromIndividualFields from "./getLocationFromIndividualFields";

type DetailsFormProps = ScreenProps<ScreenNames.Details>;
type RawDetails = {
	job?: string;
	school?: string;
	description?: string;
	locationCountry?: string;
	locationState?: string;
	locationCity?: string;
};

const getSubmissionHandler = (navigation: DetailsFormProps["navigation"], identification: IdentificationForm) => {
	return (details: RawDetails) => {
		const formattedDetails = {
			job: details.job,
			school: details.school,
			description: details.description,
			location: getLocationFromIndividualFields(details.locationCountry, details.locationState, details.locationCity),
		};
		navigation.navigate("Embodiment", { identification, details: formattedDetails });
	};
};

export default getSubmissionHandler;

import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";
import { User } from "types/index";
import checkPlainFieldsHaveChanged from "./checkPlainFieldsHaveChanged";
import checkSearchFiltersHaveChanged from "./checkSearchFiltersHaveChanged";
import checkStringifiedFieldsHaveChanged from "./checkStringifiedFieldsHaveChanged";

export const useUserChangedStatus = () => {
	const user = useSelector(selectUser);

	return (possiblyChangedUser: User): boolean => {
		const { coordinates, features, searchFilters } = user;
		const {
			coordinates: possiblyChangedCoordinates,
			features: possiblyChangedFeatures,
			searchFilters: possiblyChangedSearchFilters,
		} = possiblyChangedUser;
		if (checkPlainFieldsHaveChanged(user, possiblyChangedUser)) return true;
		if (checkStringifiedFieldsHaveChanged(coordinates, possiblyChangedCoordinates)) return true;
		if (checkStringifiedFieldsHaveChanged(features, possiblyChangedFeatures)) return true;
		if (checkSearchFiltersHaveChanged(searchFilters, possiblyChangedSearchFilters)) return true;
		return false;
	};
};

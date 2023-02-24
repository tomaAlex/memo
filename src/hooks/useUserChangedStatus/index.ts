import { useSelector } from "react-redux";
import { selectUser } from "redux/selectors";
import { User } from "types/index";
import checkPlainFieldsHaveChanged from "./checkPlainFieldsHaveChanged";
import checkSearchFiltersHaveChanged from "./checkSearchFiltersHaveChanged";

export const useUserChangedStatus = () => {
	const user = useSelector(selectUser);

	return (possiblyChangedUser: User): boolean => {
		const { searchFilters } = user;
		const { searchFilters: possiblyChangedSearchFilters } = possiblyChangedUser;

		if (checkPlainFieldsHaveChanged(user, possiblyChangedUser)) return true;
		if (checkSearchFiltersHaveChanged(searchFilters, possiblyChangedSearchFilters)) return true;

		return false;
	};
};

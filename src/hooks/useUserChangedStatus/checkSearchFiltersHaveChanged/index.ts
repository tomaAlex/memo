import { User } from "types/index";
import checkStringifiedFieldsHaveChanged from "../checkStringifiedFieldsHaveChanged";
import neutralizeSearchFilters from "./neutralizeSearchFilters";

type SearchFiltersType = User["searchFilters"];

const checkSearchFiltersHaveChanged = (
	currentSearchFilters: SearchFiltersType,
	possiblyChangedSearchFilters: SearchFiltersType
): boolean => {
	return checkStringifiedFieldsHaveChanged(
		neutralizeSearchFilters(currentSearchFilters),
		neutralizeSearchFilters(possiblyChangedSearchFilters)
	);
};

export default checkSearchFiltersHaveChanged;

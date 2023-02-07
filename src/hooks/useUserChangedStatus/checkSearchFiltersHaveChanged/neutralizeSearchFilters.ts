import { User } from "types/index";

type SearchFiltersType = User["searchFilters"];

const neutralizeSearchFilters = ({
	ageRange,
	genders,
	maximumDistance,
	likesOnly,
}: SearchFiltersType): SearchFiltersType => {
	return {
		ageRange,
		genders: genders.sort(),
		maximumDistance,
		likesOnly,
	};
};

export default neutralizeSearchFilters;

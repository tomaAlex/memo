import { createSelector } from "reselect";
import { selectUser } from "./selectUser";

export const selectSearchFilters = createSelector(selectUser, ({ searchFilters }) => searchFilters);

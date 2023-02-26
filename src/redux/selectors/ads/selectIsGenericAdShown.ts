import { RootState } from "types/index";
import { createSelector } from "reselect";
import { APP_INTERACTIONS_UNTIL_AD } from "constants/index";

export const selectIsGenericAdShown = createSelector(
	({ user: { inAppInteractions } }: RootState): boolean => inAppInteractions >= APP_INTERACTIONS_UNTIL_AD,
	(e) => e
);

import { IdentifiedUser } from "types/index";
import getUserPreferredAgeState from "./getUserPreferredAgeState";
import getUserPreferredGenderState from "./getUserPreferredGenderState";
import getUserPreferredLikesOnlyState from "./getUserPreferredLikesOnlyState";
import getUserPreferredMaximumDistanceState from "./getUserPreferredMaximumDistanceState";
import { useCallback } from "react";
import store from "redux/store";
import getAlreadySwipedState from "./getAlreadySwipedState";
import getSentBlockedState from "./getSentBlockedState";
import getReceivedBlockedState from "./getReceivedBlockedState";

const useUserFilter = (): ((unfilteredUser?: IdentifiedUser) => boolean) => {
	const {
		coordinates: selfLocation,
		id: selfId,
		searchFilters,
		likes: sentLikes,
		dislikes: sentDislikes,
		reports: selfReports,
		flags: selfFlags,
	} = store.getState().user;
	const {
		ageRange: [minimumAge, maximumAge],
		genders: preferredGenders,
		maximumDistance,
		likesOnly,
	} = searchFilters;

	return useCallback(
		(unfilteredUser?: IdentifiedUser): boolean => {
			if (!unfilteredUser) {
				return false;
			}
			const { birthDate, gender, coordinates, likes, id, reports, flags } = unfilteredUser;

			if (selfId === id) {
				return false;
			}

			const hasUserBeenBlocked = getSentBlockedState(selfId, reports, flags);
			if (hasUserBeenBlocked) {
				return false;
			}

			const hasSelfBeenBlocked = getReceivedBlockedState(id, selfReports, selfFlags);
			if (hasSelfBeenBlocked) {
				return false;
			}

			const hasUserAlreadyBeenSwiped = getAlreadySwipedState(id, sentLikes, sentDislikes);
			if (hasUserAlreadyBeenSwiped) {
				return false;
			}

			const doesUserHavePreferredAge = getUserPreferredAgeState(birthDate, minimumAge, maximumAge);
			if (!doesUserHavePreferredAge) {
				return false;
			}

			const doesUserHavePreferredGender = getUserPreferredGenderState(gender, preferredGenders);
			if (!doesUserHavePreferredGender) {
				return false;
			}

			const isUserCloseEnough = getUserPreferredMaximumDistanceState(coordinates, selfLocation, maximumDistance);
			if (!isUserCloseEnough) {
				return false;
			}

			return getUserPreferredLikesOnlyState(likes, selfId, likesOnly);
		},
		[
			likesOnly,
			maximumAge,
			maximumDistance,
			minimumAge,
			preferredGenders,
			selfFlags,
			selfId,
			selfLocation,
			selfReports,
			sentDislikes,
			sentLikes,
		]
	);
};

export default useUserFilter;

import { IdentifiedUser } from "types/index";
import getUserPreferredAgeState from "./getUserPreferredAgeState";
import getUserPreferredGenderState from "./getUserPreferredGenderState";
import getUserPreferredLikesOnlyState from "./getUserPreferredLikesOnlyState";
import getUserPreferredMaximumDistanceState from "./getUserPreferredMaximumDistanceState";
import { useCallback } from "react";
import store from "redux/store";
import getAlreadySwipedState from "./getAlreadySwipedState";

const useUserFilter = (): ((unfilteredUser?: IdentifiedUser) => boolean) => {
	const {
		coordinates: selfLocation,
		id: selfId,
		searchFilters,
		likes: sentLikes,
		dislikes: sentDislikes,
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
			const { birthDate, gender, coordinates, likes, id } = unfilteredUser;

			if (selfId === id) {
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
			selfId,
			selfLocation,
			sentDislikes,
			sentLikes,
		]
	);
};

export default useUserFilter;

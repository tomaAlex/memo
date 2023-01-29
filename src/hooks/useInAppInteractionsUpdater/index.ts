import { useSelector } from "react-redux";
import { updateUser } from "Firebase/index";
import { selectUser } from "redux/selectors";

export const useInAppInteractionsUpdater = (effect: "increment" | "decrement" | "reset" = "increment") => {
	const user = useSelector(selectUser);
	const { inAppInteractions, id } = user;
	return async () => {
		const updatedInAppInteractions =
			effect === "increment" ? inAppInteractions + 1 : effect === "decrement" ? inAppInteractions - 1 : 0;
		await updateUser(user, { ...user, inAppInteractions: updatedInAppInteractions }, id);
	};
};

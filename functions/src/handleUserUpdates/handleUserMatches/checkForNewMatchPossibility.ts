import { checkWhetherFieldHasChanged } from "../../utils";

const checkForNewMatchPossibility = (beforeChangeUserData: User, afterChangeUserData: User) => {
	return checkWhetherFieldHasChanged(beforeChangeUserData, afterChangeUserData, "matches");
};

export default checkForNewMatchPossibility;

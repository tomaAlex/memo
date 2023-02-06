import React from "react";
import { Gender } from "types/index";
import GenderFormOptionSwitch from "./GenderFormOptionSwitch";
import FormOptionSwitches from "components/forms/FormOptionSwitches";
import FormFieldLabel from "components/forms/FormFieldLabel";
import { useTranslation } from "react-i18next";
import styles from "../SearchFiltersForm.module.scss";

function SearchFiltersFormGenderPicker<D>() {
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Feed.SearchFiltersModal.Form.Labels.Gender",
	});

	return (
		<FormOptionSwitches
			formOptionSwitches={[
				<GenderFormOptionSwitch<D> key={1} onlyFilteredGenders={[Gender.MALE]} caption={translateLabels("men")} />,
				<GenderFormOptionSwitch<D> key={2} onlyFilteredGenders={[Gender.FEMALE]} caption={translateLabels("women")} />,
				<GenderFormOptionSwitch<D>
					key={3}
					onlyFilteredGenders={[Gender.MALE, Gender.FEMALE]}
					caption={translateLabels("both")}
				/>,
			]}
		>
			<FormFieldLabel style={styles.container__form__label} label={translateLabels("caption")} />
		</FormOptionSwitches>
	);
}

export default React.memo(SearchFiltersFormGenderPicker) as unknown as typeof SearchFiltersFormGenderPicker;

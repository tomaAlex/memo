import React from "react";
import { Text } from "react-native";
import { Gender } from "types/index";
import { useFormikContext } from "formik";
import FormOptionSwitch from "components/forms/FormOptionSwitches/FormOptionSwitch";
import styles from "./GenderFormOptionSwitch.module.scss";
import { cx } from "utils/index";

type TProps = {
	onlyFilteredGenders: Gender[];
	caption: string;
};

function GenderFormOptionSwitch<D>({ onlyFilteredGenders, caption }: TProps) {
	const field = "gender" as keyof D;
	const { setFieldValue, handleBlur, values } = useFormikContext<D>();
	const filteredGenders = values[field] as Gender[];
	const setFilteredGenders = (newGendersFilter: Gender[]) => setFieldValue(field as string, newGendersFilter);
	const genderFiltersMatch = JSON.stringify(filteredGenders.sort()) === JSON.stringify(onlyFilteredGenders.sort());

	return (
		<FormOptionSwitch
			onBlur={handleBlur(field as string)}
			hasCustomController={true}
			field={undefined}
			customController={[
				genderFiltersMatch,
				(showOnlyFilteredGenders) => {
					if (!showOnlyFilteredGenders) {
						return;
					}
					setFilteredGenders(onlyFilteredGenders);
				},
			]}
			presentation={
				<Text style={cx(styles.container__caption, [styles.container__caption__active, genderFiltersMatch])}>
					{caption}
				</Text>
			}
		/>
	);
}

export default React.memo(GenderFormOptionSwitch) as unknown as typeof GenderFormOptionSwitch;

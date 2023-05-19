import FormOptionSwitch from "components/forms/FormOptionSwitches/FormOptionSwitch";
import { useFormikContext } from "formik";
import { FemaleIcon, IntersexIcon, MaleIcon } from "icons";
import React from "react";
import { Gender } from "types";
import styles from "./GenderElement.module.scss";
import { Text } from "react-native";

type TProps = {
	onlyFilteredGender: Gender;
};

const getIcon = (gender: Gender, isMatch: boolean) => {
	switch (gender) {
		case "MALE":
			return <MaleIcon height={80} width={80} fill={isMatch ? "#FFFFFF" : "#111111"} />;
		case "FEMALE":
			return <FemaleIcon height={80} width={80} fill={isMatch ? "#FFFFFF" : "#111111"} />;
		case "OTHER":
			return <IntersexIcon height={95} width={100} fill={isMatch ? "#FFFFFF" : "#111111"} />;
	}
};

const getGenderName = (gender: Gender) => {
	switch (gender) {
		case "MALE":
			return "Male";
		case "FEMALE":
			return "Female";
		case "OTHER":
			return "Other";
	}
};

function GenderElement<D>({ onlyFilteredGender }: TProps) {
	const field = "gender" as keyof D;
	const { setFieldValue, handleBlur, values } = useFormikContext<D>();
	const filteredGenders = values[field] as Gender;
	const setFilteredGenders = (newGendersFilter: Gender) => setFieldValue(field as string, newGendersFilter, true);
	const genderFiltersMatch = JSON.stringify(filteredGenders) === JSON.stringify(onlyFilteredGender);

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
					setFilteredGenders(onlyFilteredGender);
				},
			]}
			presentation={getIcon(onlyFilteredGender, genderFiltersMatch)}
			controllerStyle={{
				baseController: styles.container__element,
				activeStyle: styles.container__element__selectedElement,
				inactiveStyle: styles.container__element,
			}}
			labelPosition="BOTTOM"
			labelStyle={styles.container__label}
			optionSwitchStyle={styles.container__optionSwitchContainer}
		>
			<Text style={styles.container__labelText}>{getGenderName(onlyFilteredGender)}</Text>
		</FormOptionSwitch>
	);
}

export default React.memo(GenderElement) as unknown as typeof GenderElement;

import FormOptionSwitch from "components/forms/FormOptionSwitches/FormOptionSwitch";
import { useFormikContext } from "formik";
import { FemaleIcon, MaleIcon } from "icons";
import React from "react";
import { Orientation, Gender } from "types";
import styles from "./OrientationElement.module.scss";
import { Text } from "react-native";

type TProps = {
	onlyFilteredGender: Gender;
	gender: Gender;
};

const getIcon = (gender: Gender, isMatch: boolean) => {
	switch (gender) {
		case "MALE":
			return <MaleIcon height={80} width={80} fill={isMatch ? "#FFFFFF" : "#111111"} />;
		case "FEMALE":
			return <FemaleIcon height={80} width={80} fill={isMatch ? "#FFFFFF" : "#111111"} />;
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

const getOrientation = (gender: Gender, dating: Gender, chosenOrientation: Orientation) => {
	switch (chosenOrientation) {
		case Orientation.BI:
			if (gender !== dating) {
				return Orientation.HOMO;
			}
			return Orientation.HETERO;
		case Orientation.HETERO:
			if (gender === dating) {
				return Orientation.BI;
			}
			return "" as Orientation;
		case Orientation.HOMO:
			if (gender === dating) {
				return "" as Orientation;
			}
			return Orientation.BI;
		default:
			if (gender !== dating) {
				return Orientation.HETERO;
			}
			return Orientation.HOMO;
	}
};

const orientationMatch = (chosenOrientation: Orientation, gender: Gender, userGender: Gender) => {
	switch (chosenOrientation) {
		case Orientation.BI:
			return true;
		case Orientation.HETERO:
			if (gender !== userGender) {
				return true;
			}
			return false;
		case Orientation.HOMO:
			if (gender === userGender) {
				return true;
			}
			return false;
		default:
			return false;
	}
};

function OrientationElement<D>({ gender, onlyFilteredGender }: TProps) {
	const field = "orientation" as keyof D;
	const { setFieldValue, handleBlur, values } = useFormikContext<D>();
	const filteredOrientations = values[field] as Orientation;
	const setFilteredOrientations = (newOrientationFilter: Orientation) =>
		setFieldValue(field as string, newOrientationFilter, true);
	const orientationFiltersMatch = orientationMatch(filteredOrientations, onlyFilteredGender, gender);
	return (
		<FormOptionSwitch
			onBlur={handleBlur(field as string)}
			hasCustomController={true}
			field={undefined}
			customController={[
				orientationFiltersMatch,
				(showOnlyFilteredOrientations) => {
					// if (!showOnlyFilteredOrientations) {
					// 	return;
					// }
					const orientation = getOrientation(gender, onlyFilteredGender, filteredOrientations);
					setFilteredOrientations(orientation);
				},
			]}
			presentation={getIcon(onlyFilteredGender, orientationFiltersMatch)}
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

export default React.memo(OrientationElement) as unknown as typeof OrientationElement;

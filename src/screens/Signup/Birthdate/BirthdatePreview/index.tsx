import FormDateSelector from "components/forms/FormDateSelector";
import React from "react";
import { View } from "react-native";
import BirthdayBox from "./BirthdayBox";
import styles from "./BirthdayPreview.module.scss";

type TProps = {
	day: number;
	month: number;
	year: number;
};

const BirthDate = ({ day, month, year }: TProps) => {
	return (
		<FormDateSelector
			child={
				<View style={styles.container}>
					<BirthdayBox label={"Day"} value={day} />
					<BirthdayBox label={"Month"} value={month} />
					<BirthdayBox label={"Year"} value={year} />
				</View>
			}
			field={"birthDate"}
		/>
	);
};

export default React.memo(BirthDate) as unknown as typeof BirthDate;

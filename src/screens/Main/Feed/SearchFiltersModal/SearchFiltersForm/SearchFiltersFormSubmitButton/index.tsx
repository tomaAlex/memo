import React from "react";
import { cx } from "utils/index";
import { Gender } from "types/index";
import Loading from "components/Loading";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { selectUser } from "redux/selectors";
import FormSubmitButton from "components/forms/FormSubmitButton";
import styles from "./SearchFiltersFormSubmitButton.module.scss";
import { useUserChangedStatus } from "hooks";
import { useTranslation } from "react-i18next";

type TProps = {
	isApplyingFilters: boolean;
};

const SearchFiltersFormSubmitButton = ({ isApplyingFilters }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.SearchFiltersModal.Form" });
	const {
		values: { age, distance, likesOnly, gender },
	} = useFormikContext<{
		age: [number, number];
		distance: number;
		likesOnly: boolean;
		gender: Gender[];
	}>();

	const user = useSelector(selectUser);
	const checkUserChangedStatus = useUserChangedStatus();
	const haveSearchFiltersChanged = checkUserChangedStatus({
		...user,
		searchFilters: {
			ageRange: age,
			maximumDistance: distance,
			likesOnly,
			genders: gender,
		},
	});
	const searchFiltersHaveNotChanged = !haveSearchFiltersChanged;

	return (
		<FormSubmitButton
			disabled={searchFiltersHaveNotChanged || isApplyingFilters}
			style={cx(styles.container, [styles.container__disabled, searchFiltersHaveNotChanged])}
		>
			{isApplyingFilters ? (
				<View style={styles.loadingContainer}>
					<Loading height={30} width={30} />
				</View>
			) : (
				<Text style={styles.container__caption}>{t("submit")}</Text>
			)}
		</FormSubmitButton>
	);
};

export default React.memo(SearchFiltersFormSubmitButton);

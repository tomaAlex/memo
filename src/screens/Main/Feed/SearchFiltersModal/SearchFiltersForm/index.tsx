import React from "react";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormRangeSlider from "components/forms/FormRangeSlider";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import styles from "./SearchFiltersForm.module.scss";
import { SafeAreaView, View } from "react-native";
import { useSearchFiltersFormValidationRules } from "hooks/index";
import FormSwitchInput from "components/forms/FormSwitchInput";
import FormSubmitButton from "components/forms/FormSubmitButton";
import FormRangeSliderFieldLabel from "components/forms/FormRangeSliderFieldLabel";

const SearchFiltersForm = () => {
	const searchFiltersSchema = useSearchFiltersFormValidationRules();
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Feed.SearchFiltersModal.Form.Labels",
	});

	return (
		<Formik
			validationSchema={searchFiltersSchema}
			initialValues={{ age: [18, 30] as [number, number], distance: 50, likesOnly: false }}
			onSubmit={async (searchFilters) => {
				// setIsUserUpdating(true);
				// await firebaseUpdateUser(user, userUpdate as unknown as User, id);
				// setIsUserUpdating(false);
				console.log(searchFilters);
			}}
		>
			{({ values }) => {
				const { age, distance } = values;
				const [minAge, maxAge] = age;
				return (
					<SafeAreaView style={styles.container}>
						<View style={styles.container__form}>
							<FormRangeSlider field="age" min={18} max={100} step={1}>
								<FormRangeSliderFieldLabel
									style={styles.container__form__label}
									label={translateLabels("age")}
									caption={`${minAge}-${maxAge}`}
								/>
							</FormRangeSlider>
							<FormRangeSlider field="distance" disableRange min={1} max={500} step={5}>
								<FormRangeSliderFieldLabel
									style={styles.container__form__label}
									label={translateLabels("distance")}
									caption={`${distance}km`}
								/>
							</FormRangeSlider>
							<FormSwitchInput field="likesOnly">
								<FormFieldLabel style={styles.container__form__label} label={translateLabels("likesOnly")} />
							</FormSwitchInput>
							<FormSubmitButton />
						</View>
					</SafeAreaView>
				);
			}}
		</Formik>
	);
};

export default SearchFiltersForm;

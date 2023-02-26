import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectIsPremium, selectSearchFilters } from "redux/selectors";
import styles from "./SearchFiltersForm.module.scss";
import { useFirebaseUserUpdater, useSearchFiltersFormValidationRules } from "hooks/index";
import FormSwitchInput from "components/forms/FormSwitchInput";
import FormFieldLabel from "components/forms/FormFieldLabel";
import FormRangeSlider from "components/forms/FormRangeSlider";
import FormRangeSliderFieldLabel from "components/forms/FormRangeSliderFieldLabel";
import SearchFiltersFormGenderPicker from "./SearchFiltersFormGenderPicker";
import SearchFiltersFormSubmitButton from "./SearchFiltersFormSubmitButton";
import Tooltip from "react-native-walkthrough-tooltip";
import { InfoIcon } from "icons";

type TProps = {
	resetRecommendations: () => void;
};

const SearchFiltersForm = ({ resetRecommendations }: TProps) => {
	const { ageRange, maximumDistance, likesOnly, genders } = useSelector(selectSearchFilters);
	const isPremium = useSelector(selectIsPremium);
	const searchFiltersSchema = useSearchFiltersFormValidationRules();
	const [isApplyingFilters, setIsApplyingFilters] = useState(false);
	const [isVisible, setVisible] = useState(false);
	const [translateLabels] = useTranslation("translation", {
		keyPrefix: "Screens.Main.Feed.SearchFiltersModal.Form.Labels",
	});
	const firebaseUpdateUser = useFirebaseUserUpdater();

	return (
		<Formik
			validationSchema={searchFiltersSchema}
			initialValues={{
				age: ageRange,
				distance: maximumDistance,
				likesOnly,
				gender: genders,
			}}
			onSubmit={async ({ age, distance, likesOnly: updatedLikesOnly, gender }) => {
				setIsApplyingFilters(true);
				await firebaseUpdateUser({
					searchFilters: { ageRange: age, maximumDistance: distance, likesOnly: updatedLikesOnly, genders: gender },
				});
				resetRecommendations();
				setIsApplyingFilters(false);
				// console.log(searchFilters);
			}}
		>
			{({ values }) => {
				const { age, distance } = values;
				const [minAge, maxAge] = age;
				return (
					<SafeAreaView style={styles.container}>
						<View style={styles.container__form}>
							<SearchFiltersFormGenderPicker />
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
							<FormSwitchInput field="likesOnly" disabled={!isPremium} style={!isPremium && { opacity: 0.78 }}>
								<FormFieldLabel style={styles.container__form__label} label={translateLabels("likesOnly")} />
								{!isPremium && (
									<Tooltip
										isVisible={isVisible}
										content={<Text>This feature is only available for premium users </Text>}
										onClose={() => setVisible(false)}
										placement="top"
										allowChildInteraction={true}
										showChildInTooltip={false}
									>
										<TouchableOpacity onPress={() => setVisible(true)} style={{ marginLeft: "12%", marginTop: "4%" }}>
											<InfoIcon height={17} width={20} />
										</TouchableOpacity>
									</Tooltip>
								)}
							</FormSwitchInput>
							<SearchFiltersFormSubmitButton {...{ isApplyingFilters }} />
						</View>
					</SafeAreaView>
				);
			}}
		</Formik>
	);
};

export default SearchFiltersForm;

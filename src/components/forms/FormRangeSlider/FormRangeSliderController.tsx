import { useFormikContext } from "formik";
import React, { useCallback } from "react";
import { View } from "react-native";
import RangeSlider from "rn-range-slider";
import FormFieldError from "../FormFieldError";
import styles from "./FormRangeSlider.module.scss";

type RangeSliderProps = React.ComponentProps<typeof RangeSlider>;
type TProps<D, HasNoRange extends boolean> = RangeSliderProps & {
	field: keyof D;
	disableRange?: HasNoRange;
};

function FormRangeSliderController<D, HasNoRange extends boolean>({
	field,
	disableRange = false as HasNoRange,
	...rangeSliderProps
}: TProps<D, HasNoRange>) {
	const hasRange = !disableRange;
	type HasRange = HasNoRange extends true ? false : true;
	type Range = [number, number];
	const { setFieldValue, handleBlur, values, touched, errors } = useFormikContext<D>();
	const range = values[field] as HasRange extends true ? Range : number;

	const onValueChanged = useCallback<NonNullable<RangeSliderProps["onValueChanged"]>>(
		(low, high) => {
			if (hasRange) {
				setFieldValue(field as string, [low, high]);
				return;
			}
			setFieldValue(field as string, low);
		},
		[field, hasRange, setFieldValue]
	);

	return (
		<View style={styles.container__slider}>
			<RangeSlider
				style={styles.container__slider__control}
				// the best approximation of onBlur
				onTouchEnd={handleBlur(field as string)}
				low={hasRange ? (range as Range)[0] : (range as number)}
				high={hasRange ? (range as Range)[1] : (range as number)}
				{...{ disableRange, onValueChanged, ...rangeSliderProps }}
			/>
			<View style={styles.container__slider__error}>
				<FormFieldError touched={touched} field={field} errors={errors} />
			</View>
		</View>
	);
}

export default React.memo(FormRangeSliderController) as unknown as typeof FormRangeSliderController;

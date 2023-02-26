import React, { useCallback } from "react";
import { View } from "react-native";
import FormRangeSliderRail from "./FormRangeSliderRail";
import FormRangeSliderRailSelected from "./FormRangeSliderRailSelected";
import FormRangeSliderThumb from "./FormRangeSliderThumb";
import FormRangeSliderController from "./FormRangeSliderController";
import FormRangeSliderLabel from "./FormRangeSliderLabel";
import styles from "./FormRangeSlider.module.scss";
import RangeSlider from "rn-range-slider";
import { useFormikContext } from "formik";

type RangeSliderProps = React.ComponentProps<typeof RangeSlider>;
type RangeSliderPropsKeys = keyof RangeSliderProps;
type OptionalRangeSliderPropsKeys = Exclude<RangeSliderPropsKeys, "renderThumb" | "renderRail" | "renderRailSelected">;
type OptionalRangeSliderProps = Pick<RangeSliderProps, OptionalRangeSliderPropsKeys>;

type TProps<D, HasNoRange extends boolean> = OptionalRangeSliderProps & {
	field: keyof D;
	isMandatory?: boolean;
	children?: React.ReactNode;
	disableRange?: HasNoRange;
	renderThumb?: RangeSliderProps["renderThumb"];
	renderRail?: RangeSliderProps["renderRail"];
	renderRailSelected?: RangeSliderProps["renderRailSelected"];
};

function FormRangeSlider<D, HasNoRange extends boolean>({
	field,
	isMandatory,
	children,
	disableRange = false as HasNoRange,
	renderThumb,
	renderRail,
	renderRailSelected,
	...rangeSliderProps
}: TProps<D, HasNoRange>) {
	const hasRange = !disableRange;
	type HasRange = HasNoRange extends true ? false : true;
	type Range = [number, number];
	const { values } = useFormikContext<D>();
	const range = values[field] as HasRange extends true ? Range : number;
	const memoizedRenderThumb = useCallback<RangeSliderProps["renderThumb"]>(
		(name) => {
			const low = hasRange ? (range as Range)[0] : (range as number);
			const high = hasRange ? (range as Range)[1] : undefined;
			const value = name === "low" ? low : high;
			return <FormRangeSliderThumb {...{ name, value }} />;
		},
		[hasRange, range]
	);
	const memoizedRenderRail = useCallback(() => <FormRangeSliderRail />, []);
	const memoizedRenderRailSelected = useCallback(() => <FormRangeSliderRailSelected />, []);

	return (
		<View style={styles.container}>
			<FormRangeSliderLabel {...{ children, isMandatory }} />
			<FormRangeSliderController
				{...{
					field,
					disableRange,
					renderThumb: renderThumb ?? memoizedRenderThumb,
					renderRail: renderRail ?? memoizedRenderRail,
					renderRailSelected: renderRailSelected ?? memoizedRenderRailSelected,
					...rangeSliderProps,
				}}
			/>
		</View>
	);
}

export default React.memo(FormRangeSlider) as unknown as typeof FormRangeSlider;

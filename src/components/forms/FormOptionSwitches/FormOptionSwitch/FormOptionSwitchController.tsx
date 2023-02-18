import React from "react";
import { StyleProp, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import { cx } from "utils/index";
import { useFormikContext } from "formik";
import FormFieldError from "../../FormFieldError";
import styles from "./FormOptionSwitch.module.scss";

type TProps<
	HasCustomController extends boolean,
	D extends HasCustomController extends true ? never : object
> = TouchableOpacityProps & {
	hasCustomController: HasCustomController;
	field: HasCustomController extends true ? undefined : keyof D;
	customController: HasCustomController extends true
		? [isActive: boolean, setIsActive: (activityStatus: boolean) => void]
		: undefined;
	presentation: React.ReactNode;
	controllerStyle?: {
		baseController?: StyleProp<ViewStyle>;
		activeStyle?: StyleProp<ViewStyle>;
		inactiveStyle?: StyleProp<ViewStyle>;
	};
};

function FormOptionSwitchController<
	HasCustomController extends boolean,
	D extends HasCustomController extends true ? never : object
>({
	hasCustomController,
	field,
	customController,
	controllerStyle = {
		baseController: styles.container__optionSwitch__control,
		activeStyle: styles.container__optionSwitch__control__on,
		inactiveStyle: styles.container__optionSwitch__control__off,
	},
	presentation,
	...touchableOpacityProps
}: TProps<HasCustomController, D>) {
	const { setFieldValue, handleBlur, values, touched, errors } = useFormikContext<D>();
	const isActivated = hasCustomController ? customController![0] : (values[field as keyof D] as boolean);
	const setIsActive = hasCustomController
		? customController![1]
		: (activityStatus: boolean) => setFieldValue(field as string, activityStatus);

	return (
		<View style={styles.container__optionSwitch}>
			<TouchableOpacity
				onBlur={(e) => {
					if (hasCustomController) return;
					handleBlur(field as string)(e);
				}}
				style={cx<ViewStyle>(
					controllerStyle.baseController,
					[controllerStyle.activeStyle, isActivated],
					[controllerStyle.inactiveStyle, !isActivated]
				)}
				onPress={() => {
					setIsActive(!isActivated);
				}}
				{...touchableOpacityProps}
			>
				{presentation}
			</TouchableOpacity>
			{!hasCustomController && (
				<View style={styles.container__optionSwitch__error}>
					<FormFieldError touched={touched} field={field as keyof D} errors={errors} />
				</View>
			)}
		</View>
	);
}

export default React.memo(FormOptionSwitchController) as unknown as typeof FormOptionSwitchController;

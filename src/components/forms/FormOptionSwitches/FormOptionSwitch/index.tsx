import React from "react";
import { StyleProp, TouchableOpacityProps, View, ViewStyle } from "react-native";
import styles from "./FormOptionSwitch.module.scss";
import FormOptionSwitchController from "./FormOptionSwitchController";
import FormOptionSwitchLabel from "./FormOptionSwitchLabel";

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
	labelPosition?: "BOTTOM" | "UP";
	labelStyle?: StyleProp<ViewStyle>;
	optionSwitchStyle?: StyleProp<ViewStyle>;
	isMandatory?: boolean;
	children?: React.ReactNode;
	controllerStyle?: {
		baseController?: StyleProp<ViewStyle>;
		activeStyle?: StyleProp<ViewStyle>;
		inactiveStyle?: StyleProp<ViewStyle>;
		controllerHeight?: ViewStyle["height"];
	};
};

function FormOptionSwitch<
	HasCustomController extends boolean,
	D extends HasCustomController extends true ? never : object
>({
	hasCustomController,
	field,
	customController,
	controllerStyle,
	optionSwitchStyle,
	presentation,
	isMandatory,
	children,
	labelPosition,
	labelStyle,
	...touchableOpacityProps
}: TProps<HasCustomController, D>) {
	return (
		<View style={styles.container}>
			{(labelPosition == undefined || labelPosition == "UP") && (
				<FormOptionSwitchLabel {...{ children, isMandatory, labelStyle }} />
			)}
			<FormOptionSwitchController
				{...{
					hasCustomController,
					field,
					customController,
					controllerStyle,
					optionSwitchStyle,
					presentation,
					...touchableOpacityProps,
				}}
			/>
			{labelPosition == "BOTTOM" && <FormOptionSwitchLabel {...{ children, isMandatory, labelStyle }} />}
		</View>
	);
}

export default React.memo(FormOptionSwitch) as unknown as typeof FormOptionSwitch;

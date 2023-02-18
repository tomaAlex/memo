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
	isMandatory?: boolean;
	children?: React.ReactNode;
	controllerStyle?: {
		baseController?: StyleProp<ViewStyle>;
		activeStyle?: StyleProp<ViewStyle>;
		inactiveStyle?: StyleProp<ViewStyle>;
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
	presentation,
	isMandatory,
	children,
	...touchableOpacityProps
}: TProps<HasCustomController, D>) {
	return (
		<View style={styles.container}>
			<FormOptionSwitchLabel {...{ children, isMandatory }} />
			<FormOptionSwitchController
				{...{ hasCustomController, field, customController, controllerStyle, presentation, ...touchableOpacityProps }}
			/>
		</View>
	);
}

export default React.memo(FormOptionSwitch) as unknown as typeof FormOptionSwitch;

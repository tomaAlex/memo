import React from "react";
import { ListRenderItemInfo, View } from "react-native";
import { IdLabeledData } from "types/index";

function FormChoicePickerItemElement<RawData>({ item }: ListRenderItemInfo<IdLabeledData<RawData>>) {
	return <View>{item.label}</View>;
}

export const FormChoicePickerItem = React.memo(
	FormChoicePickerItemElement
) as unknown as typeof FormChoicePickerItemElement;

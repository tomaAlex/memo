import { BusinessType, BusinessTypes, IdLabeledData } from "types/index";
import getBusinessTypeLabel from "./getBusinessTypeLabel";

const getBusinessTypePickerData = (): IdLabeledData<BusinessType>[] => {
	return BusinessTypes.map((businessType) => {
		return {
			key: businessType,
			label: getBusinessTypeLabel(businessType),
			value: businessType,
		};
	});
};
export default getBusinessTypePickerData;

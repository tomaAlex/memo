import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import CashOutSupplierForm from "./CashOutSupplierForm";

type TProps = {
	setShouldFetchBankAccounts: (shouldFetchBankAccounts: boolean) => void;
};

const CashOutSupplierButton = ({ setShouldFetchBankAccounts }: TProps) => {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<TouchableOpacity onPress={() => setShowForm(true)}>
				<Text>Add new bank account</Text>
			</TouchableOpacity>
			<CashOutSupplierForm
				visible={showForm}
				onRequestClose={() => {
					setShouldFetchBankAccounts(true);
					setShowForm(false);
				}}
			/>
		</>
	);
};

export default React.memo(CashOutSupplierButton);

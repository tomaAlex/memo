import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import PaymentSupplierForm from "./PaymentSupplierForm";

type TProps = {
	setShouldFetchCards: (shouldFetchCards: boolean) => void;
};

const PaymentSupplierButton = ({ setShouldFetchCards }: TProps) => {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<TouchableOpacity onPress={() => setShowForm(true)}>
				<Text>Add new card</Text>
			</TouchableOpacity>
			<PaymentSupplierForm
				visible={showForm}
				onRequestClose={() => {
					setShouldFetchCards(true);
					setShowForm(false);
				}}
			/>
		</>
	);
};

export default React.memo(PaymentSupplierButton);

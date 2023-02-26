import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import Loading from "components/Loading";
import { fetchCardPreviews } from "utils/index";
import styles from "./OfferPayment.module.scss";
import { PaymentSupplierButton } from "components/index";
import PremiumSubscriptionPaymentOptionPreview from "./PremiumSubscriptionPaymentOptionPreview";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview } from "types/index";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
};

const OfferPayment = ({ refRBSheet }: TProps) => {
	const [cardPreviews, setCardPreviews] = useState<CardPreview[]>([]);
	const [loadingCards, setLoadingCards] = useState(true);
	const [shouldFetchCards, setShouldFetchCards] = useState(true);

	const handleCardPreviewsFetching = useCallback(async (): Promise<void> => {
		if (!shouldFetchCards) {
			return;
		}
		setShouldFetchCards(false);
		setLoadingCards(true);
		const fetchedCardPreviews = await fetchCardPreviews();
		setLoadingCards(false);
		setCardPreviews(fetchedCardPreviews);
	}, [shouldFetchCards]);

	useEffect(() => {
		handleCardPreviewsFetching();
	}, [handleCardPreviewsFetching]);

	return (
		<FlatList
			contentContainerStyle={styles.container}
			data={cardPreviews}
			numColumns={3}
			keyExtractor={(item) => item.id}
			ListHeaderComponent={() => {
				return loadingCards ? <Loading /> : <PaymentSupplierButton {...{ setShouldFetchCards }} />;
			}}
			renderItem={({ item }) => <PremiumSubscriptionPaymentOptionPreview {...{ refRBSheet, ...item }} />}
		/>
	);
};

export default React.memo(OfferPayment);

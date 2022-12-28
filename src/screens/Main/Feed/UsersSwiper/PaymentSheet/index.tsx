import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview } from "types/index";
import UsersSwiperContext from "../UsersSwiperContext";
import PaymentOptionPreview from "./PaymentOptionPreview";
import styles from "./PaymentSheet.module.scss";
import PaymentSupplierButton from "./PaymentSupplierButton";
import fetchCardPreviews from "./utils/fetchCardPreviews";
import getOnCloseEvent from "./utils/getOnCloseEvent";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
};

const PaymentSheet = ({ refRBSheet }: TProps) => {
	const { setIsSwiperBlocked, swiperReference } = useContext(UsersSwiperContext);

	const [cardPreviews, setCardPreviews] = useState<CardPreview[]>([]);
	const [shouldFetchCards, setShouldFetchCards] = useState(true);
	const [wasBottomSheetPrematurelyClosed, setWasBottomSheetPrematurelyClosed] = useState(true);

	const handleCardPreviewsFetching = useCallback(async (): Promise<void> => {
		if (!shouldFetchCards) {
			return;
		}
		setShouldFetchCards(false);
		const fetchedCardPreviews = await fetchCardPreviews();
		setCardPreviews(fetchedCardPreviews);
	}, [shouldFetchCards]);

	useEffect(() => {
		handleCardPreviewsFetching();
	}, [handleCardPreviewsFetching]);

	return (
		// https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148
		// @ts-ignore
		<RBSheet
			ref={refRBSheet}
			height={300}
			closeOnDragDown
			closeOnPressMask
			keyboardAvoidingViewEnabled
			onClose={getOnCloseEvent(wasBottomSheetPrematurelyClosed, swiperReference, setIsSwiperBlocked)}
			onOpen={() => {
				setIsSwiperBlocked(true);
				setWasBottomSheetPrematurelyClosed(true);
			}}
		>
			<FlatList
				style={styles.container__picker__container}
				data={cardPreviews}
				ListHeaderComponent={() => <PaymentSupplierButton {...{ setShouldFetchCards }} />}
				renderItem={({ item }) => (
					<PaymentOptionPreview
						{...{
							...item,
							refRBSheet,
							swiperReference,
							setWasBottomSheetPrematurelyClosed,
						}}
					/>
				)}
			/>
		</RBSheet>
	);
};

export default React.memo(PaymentSheet);

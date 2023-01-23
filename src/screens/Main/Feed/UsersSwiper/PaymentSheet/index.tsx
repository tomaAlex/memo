import Loading from "components/Loading";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { CardPreview } from "types/index";
import UsersSwiperContext from "../UsersSwiperContext";
import PaymentOptionPreview from "./PaymentOptionPreview";
import styles from "./PaymentSheet.module.scss";
import PaymentSupplierButton from "./PaymentSupplierButton";
import fetchCardPreviews from "./utils/fetchCardPreviews";
import recoverUnmatchedUser from "./utils/recoverUnmatchedUser";

type TProps = {
	refRBSheet: React.RefObject<RBSheet>;
};

const PaymentSheet = ({ refRBSheet }: TProps) => {
	const { setIsSwiperBlocked, swiperReference, setSwipedAllUsers } = useContext(UsersSwiperContext);

	const [cardPreviews, setCardPreviews] = useState<CardPreview[]>([]);
	const [loadingCards, setLoadingCards] = useState(true);
	const [shouldFetchCards, setShouldFetchCards] = useState(true);
	const [wasBottomSheetPrematurelyClosed, setWasBottomSheetPrematurelyClosed] = useState(true);

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
		// https://github.com/nysamnang/react-native-raw-bottom-sheet/issues/148
		// @ts-ignore
		<RBSheet
			ref={refRBSheet}
			height={300}
			closeOnDragDown
			closeOnPressMask
			keyboardAvoidingViewEnabled
			onClose={() => {
				recoverUnmatchedUser(wasBottomSheetPrematurelyClosed, swiperReference, setIsSwiperBlocked, setSwipedAllUsers);
			}}
			onOpen={() => {
				setIsSwiperBlocked(true);
				setWasBottomSheetPrematurelyClosed(true);
			}}
			customStyles={{
				container: styles.container,
				draggableIcon: styles.container__draggableIcon,
			}}
		>
			<FlatList
				contentContainerStyle={styles.container__picker}
				data={cardPreviews}
				numColumns={3}
				keyExtractor={(item) => item.id}
				ListHeaderComponent={() => {
					return loadingCards ? <Loading /> : <PaymentSupplierButton {...{ setShouldFetchCards }} />;
				}}
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

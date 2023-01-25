import { CardField } from "@stripe/stripe-react-native";

type CardFieldProps = NonNullable<typeof CardField["propTypes"]>;
type CardFieldOnCardChangeValidator = CardFieldProps["onCardChange"];
type CardFieldOnCardChangeExtractor<T> = T extends React.Validator<infer U> ? U : never;
type RawCardFieldOnCardChange = CardFieldOnCardChangeExtractor<CardFieldOnCardChangeValidator>;
type CardFieldOnCardChange = NonNullable<RawCardFieldOnCardChange>;

export type CardDetails = Parameters<CardFieldOnCardChange>[0];
export type CardValidationState = CardDetails["validExpiryDate"];

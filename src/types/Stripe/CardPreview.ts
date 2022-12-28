import { CardDetails } from "./CardDetails";

export type CardPreview = {
	id: string;
	brand: CardDetails["brand"];
	last4: string;
	expiryMonth: number;
	expiryYear: number;
};

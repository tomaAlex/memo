import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
export * from "./cashOut";
export * from "./getBankPreviews";
export * from "./addCashOutBankAccount";
export * from "./addPaymentCard";
export * from "./getCardPreviews";
export * from "./getMatchPreviews";
export * from "./handleDocumentClearance";
export * from "./handleMatchClearance";
export * from "./handleUserUpdates";
export * from "./markSeen";
export * from "./payInstantMatch";
export * from "./sendMessage";
export * from "./getRecommendations";
export * from "./getBalance";

dotenv.config();
admin.initializeApp();

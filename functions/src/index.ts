import * as dotenv from "dotenv";
import * as admin from "firebase-admin";
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

dotenv.config();
admin.initializeApp();

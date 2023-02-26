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
export * from "./sendMessageNotification";
export * from "./updateFeatureSubscriptions";
export * from "./getRecommendations";
export * from "./decideWhetherUserCanCashOut";
export * from "./getBalance";
export * from "./getCollectionIds";
export * from "./subscribeToBronze";
export * from "./unsubscribeFromBronze";
export * from "./verifyConnectAccount";
export * from "./sendLikeNotification";

dotenv.config();
admin.initializeApp();

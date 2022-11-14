import * as admin from "firebase-admin";
export * from "./getMatchPreviews";
export * from "./handleDocumentClearance";
export * from "./handleMatchClearance";
export * from "./handleUserUpdates";
export * from "./sendMessage";
export * from "./getRecommendations";

admin.initializeApp();

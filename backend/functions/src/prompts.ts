import * as admin from "firebase-admin";
import {Message} from "./domain/models";

export const getPrompt = (uid: string): Promise<Message> => {
  return admin.firestore().collection("users").doc(uid).get()
    .then((userDoc) => {
      return admin.firestore().collection("prompts")
        .doc(userDoc.data()?.userType)
        .get().then((doc) => {
          return {
            content: doc.data()?.content || "",
            role: "system",
            timestamp: 0};
        }).catch((err) => err);
    }).catch((err) => err);
};

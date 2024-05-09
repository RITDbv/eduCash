import {onRequest, Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {checkAuth} from "./auth";

// todo get via from/to params
export const clearMessageHistory = onRequest(
  {region: ["europe-west1"], cors: true},
  async (req: Request, res: any) => {
    await checkAuth(req.headers.authorization).then((uid) => {
      if (req.method !== "GET") return res.status(405).send("GET");

      admin.firestore().collection("users").doc(uid).get().then(
        async (userDoc) => {
          const data = userDoc.data();
          if (data) {
            data.messages = [];
            await admin.firestore().collection("users").doc(uid).set(data);
          }
          return res.status(200).send();
        }).catch((err) => {
        return res.status(500).send(err);
      });
    }).catch((err) => {
      return res.status(401).send(err);
    });
  });

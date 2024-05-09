import {onRequest, Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {checkAuth} from "./auth";

// todo get via from/to params
export const getMessageHistory = onRequest(
  {region: ["europe-west1"], cors: true},
  async (req: Request, res: any) => {
    await checkAuth(req.headers.authorization).then((uid) => {
      if (req.method !== "GET") return res.status(405).send("GET");

      admin.firestore().collection("users").doc(uid).get().then((userDoc) => {
        const data = userDoc.data();
        if (!data) {
          return res.status(404).send();
        }

        return res.status(200).send(data["messages"] || []);
      }).catch((err) => {
        return res.status(500).send(err);
      });
    }).catch((err) => {
      return res.status(401).send(err);
    });
  });

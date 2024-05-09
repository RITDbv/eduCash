import {onRequest, Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

export const checkIfUserExists = onRequest(
  {region: ["europe-west1"], cors: true},
  async (req: Request, res: any) => {
      if (req.method !== "POST") return res.status(405).send("POST");
      const {email} = req.body;

      admin.firestore().collection("users").where("email", "==", email).get().then(snapshot => {
        if (snapshot.empty) {
          return res.status(200).send(false);
        }
        return res.status(200).send(true);
      }).catch((err) => {
        return res.status(500).send(err);
      });
  });

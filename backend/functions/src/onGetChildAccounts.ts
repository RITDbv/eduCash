import {onRequest, Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {checkAuth} from "./auth";
import {DocumentReference} from "firebase-admin/firestore";
import {ChildUser} from "./domain/models";

export const getChildAccounts = onRequest(
  {region: ["europe-west1"], cors: true},
  async (req: Request, res: any) => {
    await checkAuth(req.headers.authorization)
      .then((uid) => {
        if (req.method !== "GET") return res.status(405).send("GET");
        admin
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then(async (userDoc) => {
            const data = userDoc.data();
            if (!data) {
              return res.status(404).send();
            }

            const familyDoc = await data.family.get();
            const childrenDocs = await Promise.all(
              familyDoc
                .data()
                .children.map(async (doc: DocumentReference) => doc.get())
            );
            if (!childrenDocs?.length) {
              return res.status(204).send([]);
            }

            const childrenData = childrenDocs.map((child: any) => {
              const data: ChildUser = child.data();
              delete data.family;
              return data;
            });
            return res.status(200).send(childrenData);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send(err);
          });
      })
      .catch((err) => {
        return res.status(401).send(err);
      });
  }
);

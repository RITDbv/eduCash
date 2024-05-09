import {onRequest, Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

import {checkAuth} from "./auth";
import OpenAI from "openai";
import "dotenv/config";
import {FieldValue} from "firebase-admin/firestore";
import {getPrompt} from "./prompts";
import {Message} from "./domain/models";

const openaiChild = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_CHILD,
});
const openaiParent = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_PARENT,
});

const saveMessageInDb = (message: Message, userUid: string) => {
  // todo: can we type docs?
  return admin
    .firestore()
    .collection("users")
    .doc(userUid)
    .collection("messages")
    .add({
      messages: FieldValue.arrayUnion(message),
    });
};

// todo: res type & body type
export const chat = onRequest(
  {region: ["europe-west1"], cors: true},
  async (req: Request, res: any) => {
    await checkAuth(req.headers.authorization)
      .then(async (_authUid) => {
        if (req.method !== "POST") return res.status(405).send("POST");

        const user = req.body.user;
        const userType = await admin
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((userDoc) => userDoc.data()?.userType);
        const openai = userType === "child" ? openaiChild : openaiParent;

        const messages: Message[] = req.body.messages || [];
        messages.length &&
          saveMessageInDb(req.body.messages.slice(-1)[0], user.uid);

        // put the prompt as the first message
        const prompt = await getPrompt(user.uid);
        messages.unshift(prompt);
        messages.unshift({
          content:
            `De gebruiker heet ${user.firstName}, geboren op ${user.birthdate}. 
            Aanspreken met je/jij`,
          role: "system",
          timestamp: 0,
        });

        openai.chat.completions
          .create({
            model: "gpt-3.5-turbo",
            messages: messages.map((msg) => ({
              content: msg.content,
              role: msg.role,
            })),
            temperature: 0,
            max_tokens: 2048,
            frequency_penalty: 0,
            presence_penalty: 0,
            user: user.uid,
          })
          .then((response) => {
            saveMessageInDb(
              {
                ...response.choices[0].message,
                timestamp: new Date().getTime(),
              },
              user.uid
            );
            return res.status(200).send(response.choices[0].message);
          })
          .catch((err) => {
            return res.status(500).send(err);
          });
      })
      .catch((err) => {
        return res.status(401).send(err);
      });
  }
);

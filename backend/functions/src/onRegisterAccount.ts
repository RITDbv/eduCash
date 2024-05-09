import {onRequest, Request} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {fireAuth} from "./auth";
import {ChildUser, CaretakerUser, Family} from "./domain/models";
import * as crypto from "crypto";

type Unpacked<T> = T extends (infer U)[] ? U : T;
interface RegistrationDto {
  stepOneInfo: {
    relationship: string; // todo: enum?
    customRelation?: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    password: string;
  };
  stepTwoInfo: [
    {
      kidName: string;
      kidBirthdate: string;
      kidGender: string; // todo: enum?
    }
  ];
  adminInfo: {
    adminName: string;
    adminEmail: string;
    adminRelation: string; // todo: enum?
    customRelation?: string;
    adminBirthdate: string;
  };
}

const uuidToRef = (uuid: string) => admin.firestore().doc(`users/${uuid}`);

export const registerAccount = onRequest(
  {region: ["europe-west1"], cors: true},
  async (req: Request, res: any) => {
    if (req.method !== "POST") return res.status(405).send("POST");
    // todo: validate dto

    const registratingUserDto = req.body
      .stepOneInfo as RegistrationDto["stepOneInfo"];
    const registratingUserData: Omit<CaretakerUser, "uid" | "messages"> = {
      email: registratingUserDto.email!,
      userType: "caretaker",
      birthdate: registratingUserDto.birthdate,
      firstName: registratingUserDto.firstName,
      lastName: registratingUserDto.lastName,
      relation: registratingUserDto.relationship,
      customRelation: registratingUserDto.customRelation,
    };
    const childrenData = req.body.stepTwoInfo as RegistrationDto["stepTwoInfo"];

    const createCaretaker = (
      userData: Omit<CaretakerUser, "uid" | "messages">,
      password: string
    ) =>
      fireAuth
        .createUser({
          email: userData.email,
          password: password,
        })
        .then((user) => {
          const fbUserData: CaretakerUser = {
            uid: user.uid,
            email: user.email!,
            userType: "caretaker",
            birthdate: userData.birthdate,
            firstName: userData.firstName,
            lastName: userData.lastName,
            relation: userData.relation,
            customRelation: userData.customRelation ?? "",
          };

          admin.firestore().collection("users").doc(user.uid).set(fbUserData);
          return user.uid;
        });

    const createChild = (data: Unpacked<RegistrationDto["stepTwoInfo"]>) => {
      const userData: ChildUser = {
        uid: crypto.randomUUID(),
        userType: "child",
        birthdate: data.kidBirthdate,
        firstName: data.kidName,
        relation: data.kidGender,
      };

      admin.firestore().collection("users").doc(userData.uid).set(userData);
      return userData.uid;
    };

    createCaretaker(registratingUserData, registratingUserDto.password)
      .then(async (caretakerUuid) => {
        const createdChildrenUuids = childrenData.map((data) =>
          createChild(data)
        );
        const familyData: Family = {
          caretakers: [uuidToRef(caretakerUuid)],
          children: createdChildrenUuids?.map((uid) => uuidToRef(uid)) ?? [],
        };

        const familyRef = await admin
          .firestore()
          .collection("families")
          .add(familyData);

        // set familyRef for users
        admin
          .firestore()
          .collection("users")
          .doc(caretakerUuid)
          .set({family: familyRef}, {merge: true});
        createdChildrenUuids.forEach((uid) => {
          admin
            .firestore()
            .collection("users")
            .doc(uid)
            .set({family: familyRef}, {merge: true});
        });

        return res.status(200).send();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send(err);
      });
  }
);

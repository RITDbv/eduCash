import {Auth} from "firebase-admin/auth";
import * as admin from "firebase-admin";

// todo: refactor
export let fireAuth: Auth;
export const createFireAuth = (adminApp: admin.app.App) => {
  fireAuth = adminApp.auth();
};

export const checkAuth = (authHeader?: string) => {
  return new Promise<string>((resolve, reject) => {
    const idToken = authHeader?.split("Bearer ")[1];
    if (!idToken) {
      reject(new Error("No bearer"));
      return;
    }

    fireAuth.verifyIdToken(idToken).then((decodedToken) => {
      resolve(decodedToken.uid);
    }).catch((err) => {
      console.log(err);
      reject(new Error("No auth"));
    });
  });
};

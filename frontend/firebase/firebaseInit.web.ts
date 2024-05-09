import { connectAuthEmulator, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

export const firebaseInit = () => {
  initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    messagingSenderId: process.env.MESSAGEID,
    appId: process.env.APPID,
  });

  const auth = getAuth();

  if (process.env.CHATAPI?.includes("127.0.0.1")) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }
  return auth;
};

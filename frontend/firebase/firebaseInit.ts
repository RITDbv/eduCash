import {
  connectAuthEmulator,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

export const firebaseInit = () => {
  const app = initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    messagingSenderId: process.env.MESSAGEID,
    appId: process.env.APPID,
  });

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  if (process.env.CHATAPI?.includes("10.0.2.2")) {
    connectAuthEmulator(auth, "http://10.0.2.2:9099");
  }
  return auth;
};

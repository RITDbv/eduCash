import * as admin from "firebase-admin";
import "dotenv/config";

import {createFireAuth} from "./auth";

import {chat} from "./onChatRequest";
import {getMessageHistory} from "./onGetMessageHistory";
import {clearMessageHistory} from "./onClearMessageHistory";
import {registerAccount} from "./onRegisterAccount";
import {getChildAccounts} from "./onGetChildAccounts";
import {getUser} from "./onGetUser";
import {checkIfUserExists} from "./onCheckIfUserExists";

const adminApp = admin.initializeApp();
createFireAuth(adminApp);

export {
  chat,
  getMessageHistory,
  clearMessageHistory,
  registerAccount,
  getChildAccounts,
  getUser,
  checkIfUserExists
};

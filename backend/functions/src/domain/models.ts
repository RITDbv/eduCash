import {DocumentReference} from "firebase-admin/firestore";

export type UserType = "caretaker" | "child";

export interface Message {
  content: string | null;
  role: "system" | "user" | "assistant" | "function";
  timestamp: number;
}


export interface BaseUser {
  birthdate: string;
  firstName: string;
  uid: string;
  relation: string;
  customRelation?: string;
  userType: UserType;
  family?: DocumentReference;
}

export interface CaretakerUser extends BaseUser {
  email: string;
  lastName: string;
}

export interface ChildUser extends BaseUser {
  isLinkedToPhone?: boolean;
}

export interface Family {
  caretakers: Array<DocumentReference>;
  children: Array<DocumentReference>;
}

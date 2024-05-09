export type UserType = "caretaker" | "child";

export interface BaseUser {
  birthdate: string;
  firstName: string;
  uid: string;
  relation: string;
  customRelation?: string;
  userType: UserType;
}

export interface CaretakerUser extends BaseUser {
  email: string;
  lastName: string;
}

export interface ChildUser extends BaseUser {
  isLinkedToPhone?: boolean;
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUser } from "../domain/users";

export interface UserActions {
  type: "set" | "clear";
  value?: BaseUser;
}

export default function userReducer(
  _user: BaseUser | undefined,
  action: UserActions,
) {
  switch (action.type) {
    case "set": {
      if (!action.value) {
        throw Error(
          `userReducer \'set\' action must have value, got ${action.value}`,
        );
      }
      AsyncStorage.setItem('user', JSON.stringify(action.value));

      return action.value;
    }
    case "clear": {
      AsyncStorage.setItem('user', '');
      return undefined;
    }
    default: {
      throw Error(`Unknown userReducer action: ${action.type}`);
    }
  }
}

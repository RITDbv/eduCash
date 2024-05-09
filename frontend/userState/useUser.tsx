import * as React from "react";
import UserContext from "./UserContext";

export default function useUser() {
  const user = React.useContext(UserContext);

  return user;
}

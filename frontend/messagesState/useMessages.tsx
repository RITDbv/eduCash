import * as React from "react";
import MessagesContext from "./messagesContext";

export default function useUser() {
  const messages = React.useContext(MessagesContext);

  return messages;
}

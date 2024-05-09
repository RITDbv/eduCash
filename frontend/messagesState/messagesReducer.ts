import { Message } from "../domain/chat";

export interface MessagesActions {
  type: "set" | "add";
  value: Message | Array<Message>;
}

export default function messagesReducer(
  messages: Array<Message>,
  action: MessagesActions,
) {
  switch (action.type) {
    case "set": {
      return ([] as Array<Message>).concat(action.value);
    }
    case "add": {
      return [
        ...messages,
      ].concat(action.value);
    }
    default: {
      throw Error(`Unknown messagesReducer action: ${action.type}`);
    }
  }
}

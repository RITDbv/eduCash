import * as React from 'react';
import { Message } from '../domain/chat';
import MessagesContext from './messagesContext';


type Props = {
  value: Array<Message>;
  children: React.ReactNode;
};

export default function UserProvider({ value, children }: Props) {
  return (
    <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
  );
}

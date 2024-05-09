import { createContext } from 'react';
import { Message } from '../domain/chat';
import { MessagesActions } from './messagesReducer';

const MessagesContext = createContext<Array<Message>>([]);
export const MessagesDispatchContext = createContext<React.Dispatch<MessagesActions> | undefined>(undefined);

MessagesContext.displayName = 'MessagesContext';

export default MessagesContext;

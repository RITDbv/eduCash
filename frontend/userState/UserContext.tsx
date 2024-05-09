import { createContext } from 'react';
import { BaseUser } from '../domain/users';
import { UserActions } from './userReducer';

const UserContext = createContext<BaseUser | undefined>(undefined);
export const UserDispatchContext = createContext<React.Dispatch<UserActions> | undefined>(undefined);

UserContext.displayName = 'UserContext';

export default UserContext;

import * as React from 'react';

import UserContext from './UserContext';
import { BaseUser } from '../domain/users';


type Props = {
  value: BaseUser | undefined;
  children: React.ReactNode;
};

export default function UserProvider({ value, children }: Props) {
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
}

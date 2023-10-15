import { ReactNode, createContext, useContext, useState } from 'react';
import bcrypt from 'bcryptjs-react';

export interface AuthContextType {
  currentUser: string | null
  isError: boolean
  signup: (newUser: User, cb: () => void) => void
  signin: (user: User, resolve: () => void, reject: () => void) => void
  signout: (cb: () => void) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

type User = { username: string; password: string }

export default function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState(
    () => localStorage.getItem('user') || null
  );
  const [isError, setIsError] = useState(false);

  const signup = (newUser: User, cb: () => void): void => {
    setIsError(false);
    setCurrentUser(newUser.username);

    const hash = bcrypt.hashSync(newUser.password);
    localStorage.setItem('user', newUser.username);
    localStorage.setItem(newUser.username, hash);

    cb();
  };

  const signin = (user: User, resolve: () => void, reject: () => void): void => {
    setIsError(false);

    const hash = localStorage.getItem(user.username);
    const isRegistered = hash ? bcrypt.compareSync(user.password, hash) : false;

    if (isRegistered) {
      localStorage.setItem('user', user.username);
      setCurrentUser(user.username);
      resolve();
    } else {
      setIsError(true);
      reject();
    }
  };

  const signout = (cb: () => void): void => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    cb();
  };

  const value = {
    currentUser,
    isError,
    signup,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

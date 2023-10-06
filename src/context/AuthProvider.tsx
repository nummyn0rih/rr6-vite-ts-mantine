import { createContext, useContext, useState } from 'react';
import bcrypt from 'bcryptjs-react';

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    () => localStorage.getItem('user') || null
  );
  const [isError, setIsError] = useState(false);

  const signup = (newUser, cb) => {
    setIsError(false);
    setCurrentUser(newUser.username);

    const hash = bcrypt.hashSync(newUser.password);
    localStorage.setItem('user', newUser.username);
    localStorage.setItem(newUser.username, hash);

    cb();
  };

  const signin = (user, cb) => {
    setIsError(false);

    const hash = localStorage.getItem(user.username);
    const isRegistered = hash ? bcrypt.compareSync(user.password, hash) : false;

    if (isRegistered) {
      localStorage.setItem('user', user.username);
      setCurrentUser(user.username);
      cb();
    } else {
      setIsError(true);
    }
  };

  const signout = (cb) => {
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

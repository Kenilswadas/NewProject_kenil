// AuthProvider.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../Firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isAuthenticated = () => {
    return user !== null;
  };

  return <AuthContext.Provider value={{ user, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

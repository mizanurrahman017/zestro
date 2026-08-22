import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import AuthContext from "./AuthContext";
import { auth } from "../../Firebase/Firebase.init";

const AuthProvider = ({ children }) => {

  // Register
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Login
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Logout
  const logoutUser = () => {
    return signOut(auth);
  };

  const authInfo = {
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
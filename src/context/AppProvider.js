// src/context/AppProvider.js

import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Assuming Firebase is already set up
import AppContext from "./AppContext";

// The provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Listen for user authentication status changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserData(firebaseUser); // You can customize this if you want additional user data
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ user, userData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

// src/context/AppContext.js

import { createContext, useContext } from "react";

// Create the context
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;

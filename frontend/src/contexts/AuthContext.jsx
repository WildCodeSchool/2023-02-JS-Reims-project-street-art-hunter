/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [gameBoyColor, setGameBoyColor] = useState(
    parseInt(localStorage.getItem("gameBoyColor"), 10)
  );

  return (
    <AuthContext.Provider
      value={{ token, setToken, gameBoyColor, setGameBoyColor }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

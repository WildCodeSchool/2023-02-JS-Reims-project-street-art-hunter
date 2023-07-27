/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [role, setRole] = useState(
    parseInt(sessionStorage.getItem("role"), 10)
  );
  const [gameBoyColor, setGameBoyColor] = useState(
    parseInt(localStorage.getItem("gameBoyColor"), 10)
  );
  const [numberY, setNumberY] = useState(1);
  const [numberX, setNumberX] = useState(1);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        role,
        setRole,
        gameBoyColor,
        setGameBoyColor,
        numberY,
        setNumberY,
        numberX,
        setNumberX,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

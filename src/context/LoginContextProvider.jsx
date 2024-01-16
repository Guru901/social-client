import React, { useState } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  return (
    <LoginContext.Provider value={{ login, setLogin, user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

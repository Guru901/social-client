import React, { useState } from "react";
import LoginContext from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [post, setPost] = useState();
  return (
    <LoginContext.Provider
      value={{ login, setLogin, user, setUser, post, setPost }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;

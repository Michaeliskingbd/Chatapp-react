import React, { createContext, useState, useEffect } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || "");

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  return (
    <UserContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

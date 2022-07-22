import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const currentUser = {
    jwt: localStorage.getItem("jwt"),
    name: localStorage.getItem("name"),
    id: localStorage.getItem("user_id"),
  };

  const logout = async () => {
    localStorage.clear();
    navigate("/");
  };

  const [organizations, setOrganizations] = useState([]);
  const [memberships, setMemberships] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        currentUser,
        setMemberships,
        memberships,
        setOrganizations,
        organizations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

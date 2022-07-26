import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Shifts from "./components/Shifts/Shifts";
import Login from "./components/User/Login";
import Organizations from "./components/Organizations/Organizations";
import Signup from "./components/User/SignUp";
import EditOrg from "./components/Organizations/OrgEdit";
import AuthContext from "./context/AuthProvider";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser.jwt === null) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<Organizations />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="organizations/:id" element={<EditOrg />} />
        <Route path="shifts/:slug" element={<Shifts />} />
      </Routes>
    );
  }
};

export default App;

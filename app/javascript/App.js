import React from "react";
import { Routes, Route } from "react-router-dom";
import Shifts from "./components/Shifts/Shifts";
import Login from "./components/User/Login";

import Organizations from "./components/Organizations/Organizations";
import Signup from "./components/User/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route exact path="/organizations" element={<Organizations />} />
      <Route exact path="/organizations/:slug" element={<Shifts />} />
    </Routes>
  );
};

export default App;

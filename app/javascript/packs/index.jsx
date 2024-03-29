// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../context/AuthProvider";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>,
    document.body.appendChild(document.createElement("div"))
  );
});

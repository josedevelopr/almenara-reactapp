import React from "react";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Sidebar />
      <div className="right">
        <Header />
        <div className="content-app">
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
};

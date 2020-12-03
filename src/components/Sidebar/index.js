import React from "react";
import { NavLink } from "react-router-dom";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";

import LogoHospital from "../../images/logo_hospital.svg";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="left">
      <div className="logo">
        <img src={LogoHospital} alt="Logo Harrison" />
        <h2>Hospital Almenara</h2>
      </div>
      <ul>
        <li>
          <NavLink to="/inicio" activeClassName="active">
            <HomeOutlined /> Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            <BookOutlined /> About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

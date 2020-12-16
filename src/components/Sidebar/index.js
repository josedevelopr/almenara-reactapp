import React from "react";
import { NavLink } from "react-router-dom";
import { FileTextFilled, ToolFilled, DashboardFilled } from "@ant-design/icons";

import LogoHospital from "../../images/logo_essalud.jpg";
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
            • Inicio
          </NavLink>
        </li>
        <li>
          <span className="title">
            <DashboardFilled /> PROCESOS
          </span>
        </li>
        <li>
          <NavLink to="/proceso/asignar-servicio" activeClassName="active">
            • Asignar Servicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/proceso/asignar-convenio" activeClassName="active">
            • Asignar Convenio
          </NavLink>
        </li>
        <li>
          <span className="title">
            <ToolFilled /> MANTENIMIENTOS
          </span>
        </li>
        <li>
          <NavLink to="/mantenimiento/universidad" activeClassName="active" className="done">
            • Universidad
          </NavLink>
        </li>
        <li>
          <NavLink to="/mantenimiento/especialidad" activeClassName="active">
            • Especialidad
          </NavLink>
        </li>
        <li>
          <NavLink to="/mantenimiento/medico" activeClassName="active" className="done">
            • Médico
          </NavLink>
        </li>
        <li>
          <NavLink to="/mantenimiento/servicio" activeClassName="active">
            • Servicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/mantenimiento/grupo" activeClassName="active" className="done">
            • Grupos
          </NavLink>
        </li>
        <li>
          <span className="title">
            <FileTextFilled /> REPORTES
          </span>
        </li>
        <li>
          <NavLink to="/reporte/medico" activeClassName="active" className="done">
            • Médico
          </NavLink>
        </li>
        <li>
          <NavLink to="/reporte/especialidad" activeClassName="active">
            • Especialidad
          </NavLink>
        </li>
        <li>
          <NavLink to="/reporte/servicio" activeClassName="active" className="done">
            • Servicio
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

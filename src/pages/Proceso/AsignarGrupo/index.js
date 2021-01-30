import { Breadcrumb } from "antd";
import React from "react";
import { TableMesList } from "../../../components/Grupos/TableMesList";

import "../../Mantenimiento/Mantenimiento.css";

export const AsignaGrupo = () => {
  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Proceso</Breadcrumb.Item>
            <Breadcrumb.Item>Asignar Grupo de guardia en emergencia</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
      </header>
      <div className="content" style={{paddingBottom: '50px'}}>
        <TableMesList />
      </div>
    </div>
  );
};

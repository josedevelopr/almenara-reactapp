import { Divider } from "antd";
import React from "react";
import { SelectTd } from "./SelectTd";

let diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const TableMes = ({ mesName, mesNum, year }) => {
  let days = [];
  let daysName = [];

  let diasMes = new Date(year, mesNum, 0).getDate();
  for (let dia = 1; dia <= diasMes; dia++) {
    days.push(dia);
    let indice = new Date(year, mesNum - 1, dia).getDay();
    daysName.push(diasSemana[indice]);
  }

  return (
    <div>
      <Divider orientation="left">
        <h3>
          <b>{mesName} - {year}</b>
        </h3>
      </Divider>
      <div className="table-responsive">
        <table
          className="table table-striped"
          border="1"
          style={{ textAlign: "center" }}
        >
          <thead>
            <tr>
              <th rowSpan="2">{mesName}</th>
              {daysName.map((data) => (
                <th>{String(data).substr(0, 1)}</th>
              ))}
            </tr>
            <tr>
              {days.map((data) => (
                <th>{data}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GUARDIA DIURNA</td>
              {days.map(() => (
                <SelectTd />
              ))}
            </tr>
            <tr>
              <td>GUARDIA NOCTURNA</td>
              {days.map(() => (
                <SelectTd />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

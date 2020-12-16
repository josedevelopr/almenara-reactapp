import React from "react";
import { TableMes } from "./TableMes";

let periodo = [
  {
    numMes: 7,
    nameMes: "Julio",
    year: 2019,
  },
  {
    numMes: 8,
    nameMes: "Agosto",
    year: 2019,
  },
  {
    numMes: 9,
    nameMes: "Septiembre",
    year: 2019,
  },
  {
    numMes: 10,
    nameMes: "Octubre",
    year: 2019,
  },
  {
    numMes: 11,
    nameMes: "Noviembre",
    year: 2019,
  },
  {
    numMes: 12,
    nameMes: "Diciembre",
    year: 2019,
  },
  {
    numMes: 1,
    nameMes: "Enero",
    year: 2020,
  },
  {
    numMes: 2,
    nameMes: "Febrero",
    year: 2020,
  },
  {
    numMes: 3,
    nameMes: "Marzo",
    year: 2020,
  },
  {
    numMes: 4,
    nameMes: "Abril",
    year: 2020,
  },
  {
    numMes: 5,
    nameMes: "Mayo",
    year: 2020,
  },
  {
    numMes: 6,
    nameMes: "Junio",
    year: 2020,
  },
];

export const TableMesList = () => {
  return (
    <div>
      {periodo.map((data) => (
        <TableMes
          key={data.numMes}
          mesName={data.nameMes}
          mesNum={data.numMes}
          year={data.year}
        />
      ))}
    </div>
  );
};

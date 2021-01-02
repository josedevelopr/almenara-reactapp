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
  "Sabado",
];


export const TableMes = ({ dataTabla, listaGrupos}) => {
  let days = [];
  let daysName = []; 
  let agrupado = [];
  let mes = [];
  let turno = [];
  let dia = {};

  var mesName = '';
  var year = null;

  var turnosDiurno = [];
  var turnosNocturno = [];
  
  

  dataTabla.sort(compare);

  dataTabla.forEach(element => {
    mesName = element.mes;
    year = element.anio;
    turnosDiurno = element.turnosDiurno.dias;
    turnosNocturno = element.turnosNocturno.dias;

  });


  return (
    <div>
    
      <Divider orientation="left">
        <h3>
          <b>
            {mesName} - {year}
          </b>
        </h3>
      </Divider> 
       <div className="table-responsive">
        <table className="table table-hover" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th rowSpan="2">{mesName}</th>
              {turnosDiurno.map((data) => (
                data.diaNombre === "D" || data === "S" ?
                <th style={{color: "red"}}>{String(data.diaNombre)}</th> :
                <th>{String(data.diaNombre)}</th> 
              ))}
            </tr>
            <tr>
              {turnosDiurno.map((data) => (
                <th>{data.idDia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GUARDIA DIURNA</td>
              {turnosDiurno.map((data) =>
                data.diaNombre === "D" || data.diaNombre === "S" ? (
                  <SelectTd isBgGray={true} dia={data} teamslist={listaGrupos} />
                  ) : (
                    <SelectTd isBgGray={false} dia={data} teamslist={listaGrupos} />
                )
              )}
            </tr>
            <tr>
              <td>GUARDIA NOCTURNA</td>
              {turnosNocturno.map((data) =>
                data.diaNombre === "D" || data.diaNombre === "S" ? (
                  <SelectTd isBgGray={true} dia={data} teamslist={listaGrupos} />
                ) : (
                  <SelectTd isBgGray={false} dia={data} teamslist={listaGrupos} />
                )
              )}
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  );
};

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.anio + '' + a.mesnum;
  const bandB = b.anio + '' + b.mesnum;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}
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
  var llave = 1;

  var turnosDiurno = [];
  var turnosNocturno = [];
  
  

  // dataTabla.sort(compare);

    mesName = dataTabla.mes;
    year = dataTabla.anio;
    turnosDiurno = dataTabla.turnosDiurno.dias;
    turnosNocturno = dataTabla.turnosNocturno.dias;
    llave = dataTabla.key;


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
            <tr key={llave}>
              <th key={llave + mesName } rowSpan="2">{mesName}</th>
              {turnosDiurno.map((data) => (
                data.diaNombre === "D" || data === "S" ?
                <th key={llave + data.idReg + ''} style={{color: "red"}}>{String(data.diaNombre)}</th> :
                <th key={llave + data.idReg + ''}>{String(data.diaNombre)}</th> 
              ))}
            </tr>
            <tr>
              {turnosDiurno.map((data) => (
                <th key={llave + data.idReg + ''}>{data.idDia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr key={llave + 99}>
              <td>GUARDIA DIURNA</td>
              {turnosDiurno.map((data) =>
                data.diaNombre === "D" || data.diaNombre === "S" ? (
                  <SelectTd key={llave + data.idReg + ''} isBgGray={true} dia={data} teamslist={listaGrupos} />
                  ) : (
                    <SelectTd  key={llave + data.idReg + ''} isBgGray={false} dia={data} teamslist={listaGrupos} />
                )
              )}
            </tr>
            <tr>
              <td>GUARDIA NOCTURNA</td>
              {turnosNocturno.map((data) =>
                data.diaNombre === "D" || data.diaNombre === "S" ? (
                  <SelectTd key={llave + data.idReg + ''} isBgGray={true} dia={data} teamslist={listaGrupos} />
                ) : (
                  <SelectTd key={llave + data.idReg + ''} isBgGray={false} dia={data} teamslist={listaGrupos} />
                )
              )}
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  );
};


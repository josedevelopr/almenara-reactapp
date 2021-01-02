import React, { useEffect, useState } from "react";
import {  actualuzarMesDia } from "../../services/MesDiaService";

import {
  notification
} from "antd";

let teams = [];

export const SelectTd = ({ isBgGray, dia, teamslist}) => {
  const [teamId, setTeamId] = useState();
  const [styleTd, setStyleTd] = useState({});
  const [teamslst, setTeamslst] = useState([]);
  

  
const openNotification = (msg, description, placement) => {
  notification.success({
    message: msg,
    description: description,
    placement,
  });
};

const openErrorNotification = (msg, description, placement) => {
  notification.error({
    message: msg,
    description: description,
    placement,
  });
};

  const handleSelect = (e) => {
    console.log(dia.idReg);
    console.log(e.target.value);
    setTeamId(e.target.value);

    

    actualuzarMesDia(dia.idReg, e.target.value).then((resp) => {
      console.log(resp);            
      openNotification("Guardado Correctamente", "", "topRight");      
    }).catch(function (error) {
      if (error.response) 
      {
        openErrorNotification(error.response.data.message, "", "topRight");            
      }
    });   


  };

  useEffect(() => {
   
    setTeamId(dia.grupo);

    if (isBgGray === true) {
      setStyleTd({
        padding: "5px",
        background: "#aaa",
      });
    } else {
      setStyleTd({
        padding: "5px",
        background: "#fff",
      });
    }
  }, [isBgGray]);

  return (
    <td style={styleTd}>
      <select
        name="teamId"
        style={{ width: "40px" }}
        value={teamId}
        onChange={handleSelect}
      >
        {teamslist.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </td>
  );
};

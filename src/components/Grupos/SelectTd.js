import React, { useEffect, useState } from "react";

let teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const SelectTd = ({ isBgGray }) => {
  const [teamId, setTeamId] = useState();
  const [styleTd, setStyleTd] = useState({});

  const handleSelect = (e) => {
    console.log(e.target.value);
    setTeamId(e.target.value);
  };

  useEffect(() => {
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
        {teams.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
    </td>
  );
};

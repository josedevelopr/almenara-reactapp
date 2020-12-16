import React, { useState } from "react";

let teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const SelectTd = () => {
  const [teamId, setTeamId] = useState();

  const handleSelect = (e) => {
      console.log(e.target.value);
    setTeamId(e.target.value);
  };

  return (
    <td style={{ padding: "5px" }}>
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

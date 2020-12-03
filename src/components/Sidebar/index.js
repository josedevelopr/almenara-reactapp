import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const Sidebar = () => {
  const history = useHistory();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });
    history.replace("/login");
  };

  return (
    <div>
      <NavLink exact to="/inicio">
        Inicio
      </NavLink>
      <NavLink exact to="/about">
        About
      </NavLink>
      <button onClick={handleLogout}>Logout</button>
      <p>{user.name}</p>
    </div>
  );
};

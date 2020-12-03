import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const lastPath = localStorage.getItem("lastPath") || "/";

  const handleLogin = () => {
    dispatch({
      type: types.login,
      payload: {
        name: "Aimar Andony",
      },
    });
    history.replace(lastPath);
  };

  return (
    <div>
      Login
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

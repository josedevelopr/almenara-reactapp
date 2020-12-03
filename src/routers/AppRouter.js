import React, { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { Login } from "../page/Login";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          isAuthenticated={user.logged}
          exact
          path="/login"
          component={Login}
        />
        <PrivateRoute
          isAuthenticated={user.logged}
          path="/"
          component={DashboardRoutes}
        />
      </Switch>
    </BrowserRouter>
  );
};

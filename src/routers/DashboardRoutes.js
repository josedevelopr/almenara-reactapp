import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Inicio } from "../page/Inicio";
import { About } from "../page/About";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const DashboardRoutes = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div>
        <Switch>
          <Route exact path="/inicio" component={Inicio} />
          <Route exact path="/about" component={About} />
          <Redirect to="/inicio" />
        </Switch>
      </div>
    </>
  );
};

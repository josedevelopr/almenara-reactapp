import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { About } from "../pages/About";
import { Layout } from "../components/Layout";

export const DashboardRoutes = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/inicio" component={Inicio} />
          <Route exact path="/about" component={About} />
          <Redirect to="/inicio" />
        </Switch>
      </Layout>
    </>
  );
};

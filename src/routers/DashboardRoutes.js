import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Inicio } from "../pages/Inicio";
import { Layout } from "../components/Layout";

import { AsignarServicio } from "../pages/Proceso/AsignarServicio";
import { AsignarConvenio } from "../pages/Proceso/AsignarConvenio";
import { Universidad } from "../pages/Mantenimiento/Universidad";
import { Especialidad } from "../pages/Mantenimiento/Especialidad";
import { Medico } from "../pages/Mantenimiento/Medico";
import { Servicio } from "../pages/Mantenimiento/Servicio";
import { MedicoReporte } from "../pages/Reporte/Medico";
import { EspecialidadReporte } from "../pages/Reporte/Especialidad";
import { ServicioRerporte } from "../pages/Reporte/Servicio";
import { Grupo } from "../pages/Mantenimiento/Grupo";
import { GrupoMant } from "../pages/Mantenimiento/GrupoMant";
import { AsignaGrupo } from "../pages/Proceso/AsignarGrupo";
import { Usuario } from "../pages/Mantenimiento/Usuario";
import { ReporteRotationDoctorServiciosPorPeriodo } from "../pages/Reporte/Servicio/RotacionServiciosPorPeriodo";

export const DashboardRoutes = () => {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/inicio" component={Inicio} />
          <Route exact path="/proceso/asignar-servicio" component={AsignarServicio} />
          <Route exact path="/proceso/asignar-convenio" component={AsignarConvenio} />
          <Route exact path="/proceso/asignar-grupo" component={AsignaGrupo} />
          <Route exact path="/mantenimiento/universidad" component={Universidad} />
          <Route exact path="/mantenimiento/especialidad" component={Especialidad} />
          <Route exact path="/mantenimiento/medico" component={Medico} />
          <Route exact path="/mantenimiento/servicio" component={Servicio} />
          <Route exact path="/mantenimiento/grupomant" component={GrupoMant} />
          <Route exact path="/mantenimiento/grupo" component={Grupo} />
          <Route exact path="/mantenimiento/usuario" component={Usuario} />
          <Route exact path="/reporte/medico" component={MedicoReporte} />
          <Route exact path="/reporte/especialidad" component={EspecialidadReporte} />
          <Route exact path="/reporte/servicio" component={ServicioRerporte} />
          <Route exact path="/reporte/servicio/relacion-medicos-residentes-otras-especialidades-por-periodo" component={ReporteRotationDoctorServiciosPorPeriodo} />
          <Redirect to="/inicio" />
        </Switch>
      </Layout>
    </>
  );
};

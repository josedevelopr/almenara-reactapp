import React, { useEffect, useState } from "react";
import { Breadcrumb, Modal, Form, Select } from "antd";
import { getDoctorsByTeam } from "../../../services/DoctorService";

import "./Grupo.css";

export const Grupo = () => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);
  const [team4, setTeam4] = useState([]);
  const [team5, setTeam5] = useState([]);
  const [team6, setTeam6] = useState([]);
  const [team7, setTeam7] = useState([]);
  const [team8, setTeam8] = useState([]);
  const [team9, setTeam9] = useState([]);
  const [team10, setTeam10] = useState([]);

  const [idTeam, setIdTeam] = useState(null);

  const searchTeamId = (id) => {
    switch (id) {
      case 1:
        return team1;
      case 2:
        return team2;
      case 3:
        return team3;
      case 4:
        return team4;
      case 5:
        return team5;
      case 6:
        return team6;
      case 7:
        return team7;
      case 8:
        return team8;
      case 9:
        return team9;
      case 10:
        return team10;
      default:
        return null;
    }
  };

  const hanldeSelectTeam = (e) => {
    Modal.info({
      title: "Grupo " + e,
      content: (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>
            {searchTeamId(e).map((data) => (
              <tr>
                <td>◘ {data.paternalSurname} {data.maternalSurname}, {data.name}</td>
                <td>{data.specialty.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
      onOk() {},
    });
  };

  useEffect(() => {
    setIdTeam(null);
    getDoctorsByTeam(1).then(setTeam1);
    getDoctorsByTeam(2).then(setTeam2);
    getDoctorsByTeam(3).then(setTeam3);
    getDoctorsByTeam(4).then(setTeam4);
    getDoctorsByTeam(5).then(setTeam5);
    getDoctorsByTeam(6).then(setTeam6);
    getDoctorsByTeam(7).then(setTeam7);
    getDoctorsByTeam(8).then(setTeam8);
    getDoctorsByTeam(9).then(setTeam9);
    getDoctorsByTeam(10).then(setTeam10);
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Mantenimiento</Breadcrumb.Item>
            <Breadcrumb.Item>Grupos</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
      </header>
      <div className="content">
        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Form.Item label="Filtrar por Grupo">
            <Select
              showSearch
              name="specialty"
              placeholder="Seleccione un Grupo"
              optionFilterProp="children"
              style={{ width: "300px" }}
              value={idTeam}
              onChange={hanldeSelectTeam}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option key={1} value={1}>
                Grupo 01
              </Select.Option>
              <Select.Option key={2} value={2}>
                Grupo 02
              </Select.Option>
              <Select.Option key={3} value={3}>
                Grupo 03
              </Select.Option>
              <Select.Option key={4} value={4}>
                Grupo 04
              </Select.Option>
              <Select.Option key={5} value={5}>
                Grupo 05
              </Select.Option>
              <Select.Option key={6} value={6}>
                Grupo 06
              </Select.Option>
              <Select.Option key={7} value={7}>
                Grupo 07
              </Select.Option>
              <Select.Option key={8} value={8}>
                Grupo 08
              </Select.Option>
              <Select.Option key={9} value={9}>
                Grupo 09
              </Select.Option>
              <Select.Option key={10} value={10}>
                Grupo 10
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
        <div
          className="table-group table-responsive"
          style={{ textAlign: "center", display: "flex" }}
        >
          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 01</th>
              </tr>
            </thead>
            <tbody>
              {team1.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 02</th>
              </tr>
            </thead>
            <tbody>
              {team2.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 03</th>
              </tr>
            </thead>
            <tbody>
              {team3.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 04</th>
              </tr>
            </thead>
            <tbody>
              {team4.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 05</th>
              </tr>
            </thead>
            <tbody>
              {team5.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 06</th>
              </tr>
            </thead>
            <tbody>
              {team6.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 07</th>
              </tr>
            </thead>
            <tbody>
              {team7.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 08</th>
              </tr>
            </thead>
            <tbody>
              {team8.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 09</th>
              </tr>
            </thead>
            <tbody>
              {team9.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="table table-striped table-hover" border="1">
            <thead>
              <tr>
                <th>Grupo 10</th>
              </tr>
            </thead>
            <tbody>
              {team10.map((data) => (
                <tr>
                  <td key={data.id}>
                    {data.name} {data.paternalSurname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

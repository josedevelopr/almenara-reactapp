import { FilePdfTwoTone } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  getServiciosDoctor,  
  getServiciosDoctorByAnioAndServicio,
  viewPdfServiciosDoctorByAnioAndServicio,
  viewPdfServiciosDoctorFilterSpecialty,
} from "../../../../services/ServicioDoctorService";
import {getServiciosWithSpecialityName} from "../../../../services/ServicioService";
import {getAniosAcademicos} from "../../../../services/AnioAcademicoService";
import {getMeses} from "../../../../services/MesService";
import { Form, Breadcrumb, Button, Select, Empty } from "antd";
import { getSpecialties } from "../../../../services/SpecialtyService";

export const ReporteRotationDoctorServiciosPorPeriodo = () => {
  const [serviciosDoctor, setServiciosDoctor] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [meses, setMeses] = useState([]);
  const [aniosAcademico, setaniosAcademico] = useState([]);
  const [filterServiceOn, setfilterServiceOn] = useState(false);
  const [filterAnioAcademicoOn, setFilterAnioAcademicoOn] = useState(false);
  const [filterMesOn, setFilterMesOn] = useState(false);
  const [idService, setidService] = useState(null);
  const [idAnioAcademico, setIdAnioAcademico] = useState(null);
  const [idMes, setIdMes] = useState(null);

  const listar = () => {
    getServiciosDoctor().then(setServiciosDoctor);
  };

  const listarByidService = () => {
    if (filterAnioAcademicoOn && filterServiceOn) 
    {   
        // console.log("idMes :"+idMes);
        // console.log("idAnioAcademico :"+idAnioAcademico);
        // console.log("idService :"+idService);
        getServiciosDoctorByAnioAndServicio(idService, idAnioAcademico).then(data => {
            
            console.log(data);
            setServiciosDoctor(data);
        });
    } 
  };

  const hanldeSelectService = (e) => {
    setidService(e);
    setfilterServiceOn(true);
    //listarByidService(e);
  };

  const hanldeSelectAnioAcademico = (e) => {
    setIdAnioAcademico(e);
    setFilterAnioAcademicoOn(true);
    //listarByidService(e);
  };

  const exportToPdf = () => {
    if (filterAnioAcademicoOn && filterServiceOn) {
        viewPdfServiciosDoctorByAnioAndServicio(idAnioAcademico, idService);
    } else {
        alert("Seleccione los filtros primero");
    }
    
  };

  const clearFilter = () => {
    setFilterMesOn(false);
    setFilterAnioAcademicoOn(false);
    setfilterServiceOn(false);
    setidService(null);
    setIdMes(null);
    setIdAnioAcademico(null);
    listar();
  };

  useEffect(() => {
    // listar();
    getServiciosWithSpecialityName().then(data => {
        setServicios(data);
        console.log(data);
    });

    getMeses().then(data => {
        setMeses(data);
        console.log(data);
    });

    getAniosAcademicos().then(data => {
        setaniosAcademico(data);
        console.log(data);
    });
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Reporte</Breadcrumb.Item>
            <Breadcrumb.Item>Medicos Residentes de otras Especialidades por Periodo</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button
          type="dashed"
          color="red"
          size="large"
          danger
          onClick={exportToPdf}
        >
          <FilePdfTwoTone twoToneColor="red" /> Exportar a PDF
        </Button>
      </header>
      <div className="content">
        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Form.Item label="Servicio">
            <Select
              showSearch
              name="service"
              placeholder="Seleccione una Servicio"
              optionFilterProp="children"       
              style={{ width: "470px" }}       
              value={idService}
              onChange={hanldeSelectService}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {servicios.map((data) => (
                <Select.Option key={data.id} value={data.id}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Periodo">
            <Select
              showSearch
              name="anioAcademico"
              placeholder="Seleccione una Año"
              optionFilterProp="children"              
              value={idAnioAcademico}
              onChange={hanldeSelectAnioAcademico}
              style={{ width: "150px" }}    
              filterOption={(input, option) =>
                {   
                    console.log(input);
                    console.log(option);
                    return option.props.children[0]
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                }
              }
            >
              {aniosAcademico.map((data) => (
                <Select.Option key={data.id} value={data.id}>
                  {data.anioInicio} - {data.anioFinal}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>   
          <Form.Item>
            <Button type="ghost" onClick={listarByidService}>
              Consultar
            </Button>
          </Form.Item>       
        </Form>
        <div className="table-responsive">
          {serviciosDoctor.length === 0 ? (
            <Empty />
          ) : (
            <table
              className="table table-hover table-striped"
              border="1"
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th style={{ width: "300px" }}>Residente</th>
                  <th>Especialidad</th>
                  <th>NIV.</th>
                  <th>AÑO</th>
                  <th>JUL</th>
                  <th>AGO</th>
                  <th>SET</th>
                  <th>OCT</th>
                  <th>NOV</th>
                  <th>DIC</th>
                  <th>ENE</th>
                  <th>FEB</th>
                  <th>MAR</th>
                  <th>ABR</th>
                  <th>MAY</th>
                  <th>JUN</th>
                </tr>
              </thead>
              <tbody>
                {serviciosDoctor.map((data, key1) => (
                  <React.Fragment key={data.id}>
                    <tr>
                      <td style={{ width: "300px" }}>
                        {data.doctor.name} -{" "}
                        {data.doctor.schoolAgreement.school.shortName}
                      </td>
                      <td>{data.doctor.specialty.name}</td>
                      {data.anioAcademicoDelegados.map((data2, key2) => (        
                                <React.Fragment key={data2.id}>
                                    <td>
                                        {data2.anioAcademico.codigo}
                                    </td>
                                    <td>
                                        {data2.anioAcademico.anioInicio} -{" "}
                                        {data2.anioAcademico.anioFinal}
                                    </td>
                                    
                                    {data2.servicioDelegados.map((data3, key3) => (
                                        <td
                                            key={String(data != null && data.id != null ? key1 : data.id)
                                            .concat(String(data2 != null && data2.id != null ? key2 : data2.id))
                                            .concat(String(data3 != null && data3.id != null ? key3 : data3.id))}                                                
                                        >
                                            {data3.servicio != null ? data3.servicio.id == idService && data3.servicio != null ?  1 :  null : null}
                                            {/* {data3.servicio.id == idService && data3.servicio != null ?  1 : ""} */}
                                        </td>
                                    ))}
                                </React.Fragment>   
                            )
                        )
                    }
                    </tr>
                   
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

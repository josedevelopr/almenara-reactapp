import { FilePdfTwoTone, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  getServiciosDoctor,
  getServiciosDoctorBySpecialtyId,
  viewPdfServiciosDoctor,
  viewPdfServiciosDoctorFilterSpecialty,
} from "../../../services/ServicioDoctorService";
import { Form, Breadcrumb, Button, Select, Empty, Modal, Input, Row, Col, Drawer, notification } from "antd";
import { useFormik } from "formik";
import { getSpecialties } from "../../../services/SpecialtyService";
import { updateServicioDelegado } from "../../../services/ServicioDelegadoService";
import * as Yup from "yup";

export const AsignarServicio = () => {
  const [serviciosDoctor, setServiciosDoctor] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [filterSpecialtyOn, setfilterSpecialtyOn] = useState(false);
  const [idSpecialty, setIdSpecialty] = useState(null);
  const [isImportDataModalVisible, setIsModalImportDataVisible] = useState(false);  
  const [serviceSpecialities, setServiceSpecialities] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const editService = (data, data3) => {
    setIsModalImportDataVisible(true);    
    console.log(data3);
    console.log(data.doctor.specialty.servicios);    

    let monthID = data3.mes.id;
    let monthName = getMonthName(monthID);
    let serviceSpecialities = data.doctor.specialty.servicios;
    
    formik.values.id = data3.id;
    formik.values.mes = {id : monthID, nombre : monthName}    
    formik.values.servicio = {id : data3.servicio.id, nombre : data3.servicio.nombre}    
    setSelectedMonth(monthName);
    setServiceSpecialities( serviceSpecialities.length > 0 ? data.doctor.specialty.servicios : []);

  };

  const getMonthName = (monthNumber) => {
    let monthNames = ["Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];
    return monthNames[monthNumber-1];
  }

  const validationSchema = Yup.object().shape({
    servicio: Yup.object().shape({
      id: Yup.number().nullable().required("Servicio requerida"),
    }),
  });

  const formik = useFormik({
    initialValues : {
      id : null,
      mes : {
        id : null, 
        nombre : null
      },
      servicio : {
        id : null,
        nombre : null
      },
    },
    validationSchema,
    onSubmit: (value) => {     
      updateServicioDelegado(value).then((resp) => {
        listar();
        setIsModalImportDataVisible(false);
        openNotification("Actualizado Correctamente", "", "topRight");
        formik.resetForm();
      }).catch(function (error) {        
          openErrorNotification("Hubo un error mientras se actualizaba", "", "topRight");                    
      }); 
    },
  });

  const openNotification = (msg, description, placement) => {
    notification.success({
      message: msg,
      description: description,
      placement,
    });
  };
  
  const openErrorNotification = (msg, description, placement) => {
    notification.error({
      message: msg,
      description: description,
      placement,
    });
  };

  const handleCancelModalImport = () => {
    setIsModalImportDataVisible(false);
  };

  const listar = () => {
    getServiciosDoctor().then(setServiciosDoctor).catch((err) => console.log(err.response));
  };

  const listarByIdSpecialty = (id) => {
    getServiciosDoctorBySpecialtyId(id).then(setServiciosDoctor);
  };

  const hanldeSelectSpecialty = (e) => {
    setIdSpecialty(e);
    setfilterSpecialtyOn(true);
    listarByIdSpecialty(e);
  };

  const exportToPdf = () => {
    if (filterSpecialtyOn) {
      viewPdfServiciosDoctorFilterSpecialty(idSpecialty);
    } else {
      viewPdfServiciosDoctor();
    }
  };

  const clearFilter = () => {
    setfilterSpecialtyOn(false);
    setIdSpecialty(null);
    listar();
  };

  useEffect(() => {
    listar();
    getSpecialties().then(setSpecialties);
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Reporte</Breadcrumb.Item>
            <Breadcrumb.Item>Servicio Médico</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        {/* <Button
          type="dashed"
          color="red"
          size="large"
          danger
          onClick={exportToPdf}
        >
          <FilePdfTwoTone twoToneColor="red" /> Exportar a PDF
        </Button> */}
      </header>
      <div className="content">
        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Form.Item label="Filtrar por Especialidad">
            <Select
              showSearch
              name="specialty"
              placeholder="Seleccione una especialidad"
              optionFilterProp="children"
              style={{ width: "300px" }}
              value={idSpecialty}
              onChange={hanldeSelectSpecialty}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {specialties.map((data) => (
                <Select.Option key={data.id} value={data.id}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="ghost" onClick={clearFilter}>
              Limpiar
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
                {serviciosDoctor.map((data) => (
                  <React.Fragment key={data.id}>
                    <tr>
                      <td rowSpan="4" style={{ width: "300px" }}>
                        {data.doctor.name} -{" "}
                        {data.doctor.schoolAgreement.school.shortName}
                      </td>
                      <td rowSpan="4">{data.doctor.specialty.name}</td>
                    </tr>
                    {data.anioAcademicoDelegados.map((data2) => (
                      <tr key={String(data.id).concat(String(data2.id))}>
                        <td>{data2.anioAcademico.codigo}</td>
                        <td>
                          {data2.anioAcademico.anioInicio} -{" "}
                          {data2.anioAcademico.anioFinal}
                        </td>
                        {data2.servicioDelegados.map((data3) => (
                          <td
                            key={String(data.id)
                              .concat(String(data2.id))
                              .concat(String(data3.id))}
                            style={
                              data3.servicio.id === 1
                                ? { background: "#abe1ff" }
                                : {}
                            }
                          >
                            {data3.servicio.name} <br/>
                            <Button
                                color="blue-1"
                                size="small"
                                onClick={() => {editService(data, data3)}}
                                style={{marginTop:"5px"}}
                            >
                                <EditOutlined/>
                            </Button>
                            {/* respaw */}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>      
      <Drawer
          title="Editar Servicio"
          placement="right"
          closable={false}
          width={500}
          onClose={handleCancelModalImport}
          visible={isImportDataModalVisible}
          id="newForm"
        >
          <Form layout="vertical" onSubmitCapture={formik.handleSubmit}   >              
            <Form.Item label="Periodo">
              <Input
                name="document"
                // value={formik.values.document}
                // onChange={formik.handleChange}
                value={selectedMonth}
                disabled={true}
              />
            </Form.Item>
            
                <Form.Item label="Servicio">
                  <Select
                    showSearch
                    name="servicio.id"
                    placeholder="Seleccione un servicio"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.servicio.id}
                    onChange={(text) => formik.setFieldValue("servicio.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {serviceSpecialities.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {formik.errors.servicio && formik.touched.servicio ? (
                    <div className="error-field">{formik.errors.servicio.id}</div>
                  ) : null}
              </Form.Item>              
            <Form.Item>
              <Button  type="primary" size="small" htmlType="submit" block>
                Guardar
              </Button>
            </Form.Item>
          </Form>
      </Drawer>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Drawer,
  Input,
  Table,
  Tag,
  Form,
  Radio,
  Select,
  DatePicker,
  Row,
  Col,
  notification,
} from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { updateDoctor, createDoctor, getDoctors } from "../../../services/DoctorService";
import { getSchoolsAgreements } from "../../../services/SchoolAgreementService";
import { getSpecialties } from "../../../services/SpecialtyService";
import { getPlazas } from "../../../services/PlazaService";
import { getCampus } from "../../../services/CampusService";

import * as Yup from "yup";
import moment from "moment";

import "../Mantenimiento.css";
import { getNiveles } from "../../../services/NivelService";
import { getTeams } from "../../../services/TeamService";

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

export const Medico = () => {
  const [loading, setLoading] = useState(false);
  const [visibleNewForm, setVisibleNewForm] = useState(false);
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [editar, setEditar] = useState(false);

  const [schoolsAgreements, setSchoolsAgreements] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [plazas, setPlazas] = useState([]);
  const [campus, setCampus] = useState([]);
  const [teams, setTeams] = useState([]);
  const [niveles, setNiveles] = useState([]);

  const listar = () => {
    getDoctors().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
        data.schoolName = data.schoolAgreement.school.shortName;
        data.specialtyName = data.specialty.name;
        data.plazaName = data.plaza.name;
        data.campusName = data.campus.name;
        data.lastName = data.paternalSurname + " " + data.maternalSurname;
        // data.teamName = "Grupo " + data.team.name;
        data.nivelName = data.nivel.name;
      });
      setDataSource(resp);
      console.log(resp);
    });
  };

  const validationSchema = Yup.object().shape({
    document: Yup.string()
      .trim()
      .matches(/^[0-9]*$/, "Solo se admiten números.")
      .length(8, "Se requiere 8 dígitos.")
      .required("DNI requerido."),
    paternalSurname: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Apellido Paterno requerido."),
    maternalSurname: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Apellido Materno requerido."),
    name: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Nombre requerido."),
    schoolAgreement: Yup.object().shape({
      id: Yup.number().nullable().required("Universidad requerida"),
    }),
    specialty: Yup.object().shape({
      id: Yup.number().nullable().required("Especialidad requerida"),
    }),
    plaza: Yup.object().shape({
      id: Yup.number().nullable().required("Plaza requerida."),
    }),
    campus: Yup.object().shape({
      id: Yup.number().nullable().required("Sede requerida."),
    }),
    // team: Yup.object().shape({
    //   id: Yup.number().nullable().required("Grupo requerido."),
    // }),
    address: Yup.string()
      .trim()
      // .matches(
      //   /^[a-zA-Z\s](\d)?$/,
      //   "No se admiten caracteres especiales."
      // ),
      .min(5, "El campo debe tener al menos 5 caracteres.")
      .required("Dirección es un campo requerido"),
    cmp: Yup.string()
      .trim()
      .matches(/^[0-9]*$/, "Solo se admiten números.")
      .min(5, "Solo se admite min. 5 dígitos.")
      .max(6, "Solo se admite máx. 6 dígitos.")
      .required("CMP requerido"),
    email: Yup.string()
      .trim()
      .email("Formato no válido. (ej. correo@example.com)")
      .required("Correo requerido."),
    phone: Yup.string()
      .length(9, "Se requiere 9 dígitos.")
      .required("N° Celular requerido."),
  });
  
  const formik = useFormik({
    initialValues: {
      action : "new",
      document: "",
      paternalSurname: "",
      maternalSurname: "",
      name: "",
      schoolAgreement: {
        id: null,
      },
      specialty: {
        id: null,
      },
      plaza: {
        id: null,
      },
      campus: {
        id: null,
      },
      team: {
        id: null,
      },
      nivel: {
        id: 1,
      },
      birthDate: null,
      address: "",
      cmp: "",
      email: "",
      phone: "",
      status: true,
    },
    validationSchema,
    // onOpen :() => {
    //   console.log("Opening...")
    // },
    onSubmit: (value) => {      
      console.log(value);
      
      if(value.action=="new" || editar == false)
      { createDoctor(value).then((resp) => {
          // console.log(resp);
          listar();
          setVisibleNewForm(false);
          openNotification("Guardado Correctamente", "", "topRight");
          formik.resetForm();
        }).catch(function (error) {
          if (error.response) 
          {
            openErrorNotification(error.response.data.message, "", "topRight");            
          }
        });   
      } 
      else if(value.action=="update" || editar == true)
      { delete value.action;
        // console.log(value);
        updateDoctor(value).then((resp) => {
          console.log(resp);
          listar();
          setVisibleUpdateForm(false);
          openNotification("Actualizado Correctamente", "", "topRight");
          formik.resetForm();
        }).catch(function (error) {
          if (error.response) 
          {
            openErrorNotification(error.response.data.message, "", "topRight");            
          }
        });
      }      
    },
  });

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "left",
      align: "center",
    },
    {
      title: "N° Documento",
      dataIndex: "document",
      key: "document",
      width: 110,
      align: "center",
    },
    {
      title: "Apellidos",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
    },
    {
      title: "Nombres",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Universidad",
      dataIndex: "schoolName",
      key: "schoolName",
      width: 108,
      align: "center",
    },
    {
      title: "Especialidad",
      dataIndex: "specialtyName",
      key: "specialtyName",
      align: "center",
    },
    {
      title: "Plaza",
      dataIndex: "plazaName",
      key: "plazaName",
      width: 80,
      align: "center",
    },
    // {
    //   title: "Grupo",
    //   dataIndex: "teamName",
    //   key: "teamName",
    //   width: 80,
    //   align: "center",
    // },
    {
      title: "Nivel",
      dataIndex: "nivelName",
      key: "nivelName",
      width: 70,
      align: "center",
    },
    {
      title: "Sede",
      dataIndex: "campusName",
      key: "campusName",
      width: 78,
      align: "center",
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "birthDate",
      key: "birthDate",
      align: "center",
    },
    {
      title: "Domicilio",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "CMP",
      dataIndex: "cmp",
      key: "cmp",
      width: 70,
      align: "center",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "N° Celular",
      dataIndex: "phone",
      key: "phone",
      width: 100,
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 90,
      align: "center",
      render: (val, record) =>
        record.status ? (
          <Tag color="green">ACTIVO</Tag>
        ) : (
          <Tag color="red">INACTIVO</Tag>
        ),
      filters: [
        {
          text: "ACTIVO",
          value: true,
        },
        {
          text: "INACTIVO",
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        let status = String(record.status);
        return status.indexOf(value) === 0;
      },
    },
    {
      title: "Acciones",
      key: "action",
      fixed: "right",
      width: 100,
      align: "center",
      render: (record) => (
        //checkhere
        <Button type="link" size="small" onClick={() => {showUpdateForm(record);}}>
          <EditOutlined />
        </Button>
      ),
    },
  ];

  const keyUpTable = (value) => {
    setFilterTable(
      dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  const handleCloseDrawerNewForm = (e) => {    
    setVisibleNewForm(false);
    formik.resetForm();
  };

  const handleCloseDrawerUpdateForm = (e) => {    
    setVisibleUpdateForm(false);
    formik.resetForm();
  };

  const showUpdateForm = (doctor) => {
    setDataDoctorToForm(doctor);
    setVisibleUpdateForm(true);
  };

  const dateFormatList = ["DD/MM/YYYY", "YYYY/MM/DD"];

  function setDataDoctorToForm(doctor)
  { formik.initialValues.action = "update";
    formik.initialValues.id = doctor.id;
    formik.initialValues.document = doctor.document;
    formik.initialValues.paternalSurname = doctor.paternalSurname;
    formik.initialValues.maternalSurname = doctor.maternalSurname;
    formik.initialValues.name = doctor.name;
    formik.initialValues.schoolAgreement.id = doctor.schoolAgreement.id;
    formik.initialValues.specialty.id = doctor.specialty.id;
    formik.initialValues.plaza.id = doctor.plaza.id;
    formik.initialValues.campus.id = doctor.campus.id;
    formik.initialValues.plazaName = doctor.campus.plazaName;
    
    formik.initialValues.nivel.id = doctor.nivel.id;
    formik.initialValues.birthDate = moment(doctor.birthDate, dateFormatList);
    formik.initialValues.address = doctor.address;
    formik.initialValues.cmp = doctor.cmp;
    formik.initialValues.email = doctor.email;
    formik.initialValues.phone = doctor.phone;
    formik.initialValues.status = doctor.status;

    setEditar(true);
    //console.log(moment(doctor.birthDate).format("DD/MM/YYYY"));
  }

  function cleanDataDoctorToForm()
  { formik.initialValues.action = 'new';
    formik.initialValues.id = null;
    formik.initialValues.document = '';
    formik.initialValues.paternalSurname = '';
    formik.initialValues.maternalSurname = '';
    formik.initialValues.name = '';
    formik.initialValues.schoolAgreement.id = null;
    formik.initialValues.specialty.id = null;
    formik.initialValues.plaza.id = null;
    formik.initialValues.campus.id = null;
    formik.initialValues.plazaName = '';
    
    formik.initialValues.nivel.id = 1;
    formik.initialValues.birthDate = moment();
    formik.initialValues.address = '';
    formik.initialValues.cmp = '';
    formik.initialValues.email = '';
    formik.initialValues.phone = '';
    formik.initialValues.status = true;

    setEditar(false);
    //console.log(moment(doctor.birthDate).format("DD/MM/YYYY"));
  }

  function disabledDate(current) {
    return current && current > moment().startOf("day");
  }

  useEffect(() => {
    setLoading(false);
    listar();
    getSchoolsAgreements().then(setSchoolsAgreements);
    getSpecialties().then(setSpecialties);
    getPlazas().then(setPlazas);
    getCampus().then(setCampus);
    getNiveles().then(setNiveles);
    getTeams().then(setTeams);
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Mantenimiento</Breadcrumb.Item>
            <Breadcrumb.Item>Médico</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button type="primary" size="large" onClick={() => { cleanDataDoctorToForm({}); setVisibleNewForm(true);}}>
          <PlusOutlined /> Agregar
        </Button>
      </header>
      <div className="content">
        <Input.Search
          className="searchInput"
          placeholder="Buscar por nombre..."
          onKeyUpCapture={(e) => keyUpTable(e.target.value)}
        />
        <Table
          loading={loading}
          dataSource={filterTable === null ? dataSource : filterTable}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 2000 }}
        />
        <Drawer
          title="Agregar Médico"
          placement="right"
          closable={false}
          width={500}
          onClose={handleCloseDrawerNewForm}
          visible={visibleNewForm}
          id="newForm"
        >
          <Form
            title="Universidad"
            layout="vertical"
            onSubmitCapture={formik.handleSubmit}
          >
            <Row gutter={12} style={{display:'none'}}>
              <Col span={12}>
                <Form.Item required>
                  <Input
                    name="action"
                    value={formik.values.action}
                    onChange={formik.handleChange}                    
                  />                  
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="DNI:" required>
                  <Input
                    name="document"
                    value={formik.values.document}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.document && formik.touched.document ? (
                    <div className="error-field">{formik.errors.document}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Apellido Paterno:" required>
                  <Input
                    name="paternalSurname"
                    value={formik.values.paternalSurname}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.paternalSurname &&
                  formik.touched.paternalSurname ? (
                    <div className="error-field">
                      {formik.errors.paternalSurname}
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Apellido Materno:" required>
                  <Input
                    name="maternalSurname"
                    value={formik.values.maternalSurname}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.maternalSurname &&
                  formik.touched.maternalSurname ? (
                    <div className="error-field">
                      {formik.errors.maternalSurname}
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Nombre Completo:" required>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error-field">{formik.errors.name}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Universidad:" required>
              <Select
                showSearch
                name="schoolAgreement.id"
                placeholder="Seleccione una universidad"
                optionFilterProp="children"
                style={{ width: "100%" }}
                value={formik.values.schoolAgreement.id}
                onChange={(text) =>
                  formik.setFieldValue("schoolAgreement.id", text)
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {schoolsAgreements.map(({ id, school }) => (
                  <Select.Option key={id} value={id}>
                    {school.name}
                  </Select.Option>
                ))}
              </Select>
              {formik.errors.schoolAgreement &&
              formik.touched.schoolAgreement ? (
                <div className="error-field">
                  {formik.errors.schoolAgreement.id}
                </div>
              ) : null}
            </Form.Item>
            <Form.Item label="Especialidad:" required>
              <Select
                showSearch
                name="specialty.id"
                placeholder="Seleccione una especialidad"
                optionFilterProp="children"
                style={{ width: "100%" }}
                value={formik.values.specialty.id}
                onChange={(text) => formik.setFieldValue("specialty.id", text)}
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
              {formik.errors.specialty && formik.touched.specialty ? (
                <div className="error-field">{formik.errors.specialty.id}</div>
              ) : null}
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Plaza:" required>
                  <Select
                    showSearch
                    name="plaza.id"
                    placeholder="Seleccione una plaza"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.plaza.id}
                    onChange={(text) => formik.setFieldValue("plaza.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {plazas.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {formik.errors.plaza && formik.touched.plaza ? (
                    <div className="error-field">{formik.errors.plaza.id}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sede:" required>
                  <Select
                    showSearch
                    name="campus.id"
                    placeholder="Seleccione una sede"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.campus.id}
                    onChange={(text) => formik.setFieldValue("campus.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {campus.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {formik.errors.campus && formik.touched.campus ? (
                    <div className="error-field">{formik.errors.campus.id}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>

            {/* <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Grupo:" required>
                  <Select
                    showSearch
                    name="grupo.id"
                    placeholder="Seleccione un grupo"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.team.id}
                    onChange={(text) => formik.setFieldValue("team.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {teams.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {formik.errors.team && formik.touched.team ? (
                    <div className="error-field">{formik.errors.team.id}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}> */}
                <Form.Item label="Nivel:">
                  <Select
                    disabled
                    showSearch
                    name="campus.id"
                    placeholder="Seleccione un nivel"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.nivel.id}
                    onChange={(text) => formik.setFieldValue("nivel.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {niveles.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              {/* </Col>
            </Row> */}

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Fecha de Nacimiento:">
                  <DatePicker
                    style={{ width: "100%" }}
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={(value) =>
                      formik.setFieldValue("birthDate", value)
                    }
                    disabledDate={disabledDate}
                    format={dateFormatList}
                  />
                  {formik.errors.birthDate && formik.touched.birthDate ? (
                    <div className="error-field">{formik.errors.birthDate}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CMP:" required>
                  <Input
                    name="cmp"
                    value={formik.values.cmp}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.cmp && formik.touched.cmp ? (
                    <div className="error-field">{formik.errors.cmp}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Domicilio:">
              <Input
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address && formik.touched.address ? (
                <div className="error-field">{formik.errors.address}</div>
              ) : null}
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Correo:" required>
                  <Input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="error-field">{formik.errors.email}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="N°Celular:" required>
                  <Input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="error-field">{formik.errors.phone}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Estado:">
              <Radio.Group
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <Radio.Button value={true}>ACTIVO</Radio.Button>
                <Radio.Button value={false}>INACTIVO</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Registrar
            </Button>
          </Form>
        </Drawer>

        <Drawer
          title="Actualizar Médico"
          placement="right"
          closable={false}
          width={500}
          onClose={handleCloseDrawerUpdateForm}
          visible={visibleUpdateForm}
          id="updateForm"
        >
          <Form
            title="Medico"
            layout="vertical"
            onSubmitCapture={formik.handleSubmit}
          >            
            <Row gutter={12} style={{display:'none'}}>
              <Col span={12}>
                <Form.Item required>
                  <Input
                    name="action"
                    value={formik.values.action}
                    onChange={formik.handleChange}                    
                  />                  
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="ID:" required >
                  <Input
                    disabled
                    name="id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.document && formik.touched.document ? (
                    <div className="error-field">{formik.errors.document}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="DNI:" required>
                  <Input
                    name="document"
                    value={formik.values.document}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.document && formik.touched.document ? (
                    <div className="error-field">{formik.errors.document}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Apellido Paterno:" required>
                  <Input
                    name="paternalSurname"
                    value={formik.values.paternalSurname}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.paternalSurname &&
                  formik.touched.paternalSurname ? (
                    <div className="error-field">
                      {formik.errors.paternalSurname}
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Apellido Materno:" required>
                  <Input
                    name="maternalSurname"
                    value={formik.values.maternalSurname}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.maternalSurname &&
                  formik.touched.maternalSurname ? (
                    <div className="error-field">
                      {formik.errors.maternalSurname}
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Nombre Completo:" required>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error-field">{formik.errors.name}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Universidad:" required>
              <Select
                showSearch
                name="schoolAgreement.id"
                placeholder="Seleccione una universidad"
                optionFilterProp="children"
                style={{ width: "100%" }}
                value={formik.values.schoolAgreement.id}
                onChange={(text) =>
                  formik.setFieldValue("schoolAgreement.id", text)
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {schoolsAgreements.map(({ id, school }) => (
                  <Select.Option key={id} value={id}>
                    {school.name}
                  </Select.Option>
                ))}
              </Select>
              {formik.errors.schoolAgreement &&
              formik.touched.schoolAgreement ? (
                <div className="error-field">
                  {formik.errors.schoolAgreement.id}
                </div>
              ) : null}
            </Form.Item>
            <Form.Item label="Especialidad:" required>
              <Select
                showSearch
                name="specialty.id"
                placeholder="Seleccione una especialidad"
                optionFilterProp="children"
                style={{ width: "100%" }}
                value={formik.values.specialty.id}
                onChange={(text) => formik.setFieldValue("specialty.id", text)}
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
              {formik.errors.specialty && formik.touched.specialty ? (
                <div className="error-field">{formik.errors.specialty.id}</div>
              ) : null}
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Plaza:" required>
                  <Select
                    showSearch
                    name="plaza.id"
                    placeholder="Seleccione una plaza"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.plaza.id}
                    onChange={(text) => formik.setFieldValue("plaza.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {plazas.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {formik.errors.plaza && formik.touched.plaza ? (
                    <div className="error-field">{formik.errors.plaza.id}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Sede:" required>
                  <Select
                    showSearch
                    name="campus.id"
                    placeholder="Seleccione una sede"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.campus.id}
                    onChange={(text) => formik.setFieldValue("campus.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {campus.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {formik.errors.campus && formik.touched.campus ? (
                    <div className="error-field">{formik.errors.campus.id}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>

            {/* <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Grupo:" required>
                  <Select
                    showSearch
                    name="grupo.id"
                    placeholder="Seleccione un grupo"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.team.id}
                    onChange={(text) => formik.setFieldValue("team.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {teams.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                  {formik.errors.team && formik.touched.team ? (
                    <div className="error-field">{formik.errors.team.id}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}> */}
                <Form.Item label="Nivel:">
                  <Select
                    disabled
                    showSearch
                    name="campus.id"
                    placeholder="Seleccione un nivel"
                    optionFilterProp="children"
                    style={{ width: "100%" }}
                    value={formik.values.nivel.id}
                    onChange={(text) => formik.setFieldValue("nivel.id", text)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {niveles.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              {/* </Col>
            </Row> */}

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Fecha de Nacimiento:">
                  <DatePicker
                    style={{ width: "100%" }}
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={(value) =>
                      formik.setFieldValue("birthDate", value)
                    }
                    disabledDate={disabledDate}
                    format={dateFormatList}
                  />
                  {formik.errors.birthDate && formik.touched.birthDate ? (
                    <div className="error-field">{formik.errors.birthDate}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CMP:" required>
                  <Input
                    name="cmp"
                    value={formik.values.cmp}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.cmp && formik.touched.cmp ? (
                    <div className="error-field">{formik.errors.cmp}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Domicilio:">
              <Input
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address && formik.touched.address ? (
                <div className="error-field">{formik.errors.address}</div>
              ) : null}
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Correo:" required>
                  <Input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="error-field">{formik.errors.email}</div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="N°Celular:" required>
                  <Input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="error-field">{formik.errors.phone}</div>
                  ) : null}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Estado:">
              <Radio.Group
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <Radio.Button value={true}>ACTIVO</Radio.Button>
                <Radio.Button value={false}>INACTIVO</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Actualizar
            </Button>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

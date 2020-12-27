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
  notification,
  Checkbox,
  Row,
  Col,
} from "antd";
import { EditOutlined, PlusOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { getRoleById, getRoles } from "../../../services/RoleService";
import { getUserById, getUsers, findById, updateUser, createUser } from "../../../services/UserService";
import * as Yup from "yup";

import "../Mantenimiento.css";
import { useFormik } from "formik";
import { render } from "@testing-library/react";

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

export const Usuario = () => {
  const [loading, setLoading] = useState(false);
  const [visibleNewForm, setVisibleNewForm] = useState(false);
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [editar, setEditar] = useState(false);
  const [filterTable, setFilterTable] = useState(null);  
  const [dataSource, setDataSource] = useState([]);

  const [roles, setRoles] = useState([]);

  const listar = () => {
    getUsers().then((resp) => {
      console.log(resp);
      resp.forEach((data) => {
        data.key = data.id;
      });
      setDataSource(resp);
    });
  };

  function roleOptions(data){
    let response = [];
    data.forEach( (role) => {
      // console.log(role);
      response.push( {
        label : role.name,
        value : role.id
      });
    });
    return response;
  };

  function getUser(id)
  {
    getUserById(id).then((data) => {
      setDataDoctorToForm(data);
      setVisibleUpdateForm(true);
    });
  }

  function roleOptionsChecked(data){
    let response = [];
    data.forEach( (role) => {
      // console.log(role);
      response.push( role.id );
    });
    return response;
  };

  function onChangeRoles(checkedValues) {
    formik.values.roles = [];
    checkedValues.forEach(rol => {      
      formik.values.roles.push({id : rol});
    });    
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z ]*$/, "Solo se admiten letras.")
      .required("Nombre de Usuario requerido."),
    password: Yup.string()      
      .min(8, "Debe tener al menos 8 caracteres.")
      .required("Contraseña requerido."),
    name: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z ]*$/, "Solo se admiten letras.")
      .required("Nombre requerido."),
    lastName: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z ]*$/, "Solo se admiten letras.")
      .required("Apellido requerido."),
  });

  const formik = useFormik({
    initialValues: {  
      action : "new",
      username : "",
      password : "",
      name : "",
      lastName : "",
      status : true,
      roles: []
  },
    validationSchema,
    onSubmit: (value) => {
      console.log(value);
      delete value.key;      
      value.username = value.username.trim();      
      if(value.action == "new" || editar == false)
      { delete value.action;      
        createUser(value).then((resp) => {
          console.log(resp);
          listar();
          setVisibleNewForm(false);
          openNotification("Registrado Correctamente", "", "topRight");
          formik.resetForm();
        }).catch(function (error) {
          if (error.response) 
          {
            openErrorNotification(error.response.data.message, "", "topRight");            
          }
        });
      }
      else if(value.action == "update" || editar == true)
      { delete value.action;      
        updateUser(value).then((resp) => {
          console.log(resp);
          listar();
          setVisibleUpdateForm(false);
          openNotification("Actualizado Correctamente", "", "topRight");
          formik.resetForm();
        }).catch(function (error) {
          if (error.response) 
          { openErrorNotification(error.response.data.message, "", "topRight");
            // console.log(error.response.status);
            // console.log(error.response.headers);
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
      title: "Nombre de Usuario",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Nombres",
      dataIndex: "name",
      key: "name",
      align: "center",
    },    
    {
      title: "Apellido",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 120,
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
         <Button type="primary" size="large" onClick={() => { showUpdateForm(record); }}>
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

  const showUpdateForm = (user) => {    
    getUser(user.id);
    console.log(user);    
  };

  function setDataDoctorToForm(doctor)
  { formik.values.id = doctor.id;
    formik.values.username = doctor.username;
    formik.values.password = doctor.password;
    formik.values.name = doctor.name;
    formik.values.lastName = doctor.lastName;
    formik.values.status = doctor.status;
    formik.values.roles = doctor.roles;
    formik.values.action = "update";
    setEditar(true);
  }

  function cleanDataDoctorToForm()
  { formik.values.id = null;
    formik.values.username = '';
    formik.values.password = '';
    formik.values.name = '';
    formik.values.lastName = '';
    formik.values.status = true;
    formik.values.roles = [];
    formik.values.action = "new";
    setEditar(false);
  }

  useEffect(() => {
    setLoading(false);    
    listar();
    getRoles().then(setRoles);
    // console.log(roles);
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Mantenimiento</Breadcrumb.Item>
            <Breadcrumb.Item>Usuario</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button type="primary" size="large" onClick={() =>{ cleanDataDoctorToForm(); setVisibleNewForm(true)}}>
          <PlusOutlined /> Agregar
        </Button>
      </header>
      <div className="content">
        <Input.Search
          className="searchInput"
          placeholder="Buscar por ..."
          onKeyUpCapture={(e) => keyUpTable(e.target.value)}
        />
        <Table
          loading={loading}
          dataSource={filterTable === null ? dataSource : filterTable}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
        <Drawer
          title="Agregar Usuario"
          placement="right"
          closable={false}
          width={400}
          onClose={handleCloseDrawerNewForm}
          visible={visibleNewForm}
        >
          <Form
            title="Usuario"
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
            <Form.Item label="Nombre de Usuario:" required>
              <Input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className="error-field">{formik.errors.username}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Contraseña:" required>
              <Input.Password
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="error-field">{formik.errors.password}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Nombres:" required>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error-field">{formik.errors.name}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Apellidos:" required>
              <Input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && formik.touched.lastName ? (
                <div className="error-field">{formik.errors.lastName}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Roles:" required>
              {/* checkhere */}
              <Checkbox.Group options={roleOptions(roles)} defaultValue={[2]} onChange={onChangeRoles} />
              {formik.errors.roles && formik.touched.roles ? (
                <div className="error-field">{formik.errors.roles}</div>
              ) : null}
            </Form.Item>
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
            <Button type="primary" htmlType="submit" block> Registrar</Button>
          </Form>
        </Drawer>

        <Drawer
          title="Actualizar Usuario"
          placement="right"
          closable={false}
          width={400}
          onClose={handleCloseDrawerUpdateForm}
          visible={visibleUpdateForm}
        >
          <Form
            title="Usuario"
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
                <Form.Item label="Nombre de Usuario:" required>
                  <Input
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <div className="error-field">{formik.errors.username}</div>
                  ) : null}
              </Form.Item>
              </Col>
            </Row>            
            <Form.Item label="Contraseña:" required>
              <Input.Password
                  placeholder="Ingrese la nueva contraseña"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}   
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="error-field">{formik.errors.password}</div>
                ) : null}
            </Form.Item>
            <Form.Item label="Nombres:" required>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error-field">{formik.errors.name}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Apellidos:" required>
              <Input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && formik.touched.lastName ? (
                <div className="error-field">{formik.errors.lastName}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Roles:" required>
              {/* checkhere */}
              <Checkbox.Group options={roleOptions(roles)} defaultValue={roleOptionsChecked(formik.values.roles)} onChange={onChangeRoles} />
              {formik.errors.roles && formik.touched.roles ? (
                <div className="error-field">{formik.errors.roles}</div>
              ) : null}
            </Form.Item>
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
            <Button type="primary" htmlType="submit" block> Actualizar</Button>
              

            
          </Form>
        </Drawer>
      </div>
    </div>
  );
};
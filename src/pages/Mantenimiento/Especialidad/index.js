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
} from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";


import { getSpecialties, createEspecialidad, actualizarEspecialidad } from "../../../services/SpecialtyService";

import * as Yup from "yup";

import "../Mantenimiento.css";
import { useFormik } from "formik";

const openNotification = (msg, description, placement) => {
  notification.success({
    message: msg,
    description: description,
    placement,
  });
};

export const Especialidad = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editar, setEditar] = useState(false);
  const [filterTable, setFilterTable] = useState(null);  
  const [dataSource, setDataSource] = useState([]);

  const listar = () => {
    getSpecialties().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
      });
      console.log(resp);
      setDataSource(resp);
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Nombre requerido."),
    state: Yup.boolean()
      .required("Debe seleccionar un estado para la especialidad."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      state: true,
    },
    validationSchema,
    onSubmit: (value) => {
      console.log(value);
      if(editar)
      {
        actualizarEspecialidad(value).then((resp) => {
          console.log(resp);
          listar();
          setVisible(false);
          openNotification("Actualizado Correctamente", "", "topRight");
        });
      }
      else
      {
        createEspecialidad(value).then((resp) => {
          console.log(resp);
          listar();
          setVisible(false);
          openNotification("Guardado Correctamente", "", "topRight");
        });
      }      
      formik.resetForm();
    },
  });



  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "left",
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      width: 120,
      align: "center",
      render: (val, record) =>
        record.state ? (
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
        let status = String(record.state);
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
        // <Button type="link" size="small">
        //   <EditOutlined />
        // </Button>
         <Button type="primary" size="large" onClick={() => 
          {             
            formik.values.name = record.name;
            formik.values.state = record.state;
            formik.values.id = record.id;
            setEditar(true);
            setVisible(true);          
          }
         
         }>
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

  const handleCloseDrawer = () => {
    setVisible(false);
    formik.resetForm();
  };

  useEffect(() => {
    setLoading(false);
    listar();
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Mantenimiento</Breadcrumb.Item>
            <Breadcrumb.Item>Especialidad</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button type="primary" size="large" onClick={() =>           
          {
            formik.values.name = null;
            formik.values.id = null;
            formik.values.state = null;
            setEditar(false);
            setVisible(true)
          }
          }>
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
          title={
            editar? (
            "Actualizar Especialidad"
            ) : "Agregar Especialidad"
          }
          placement="right"
          closable={false}
          width={400}
          onClose={handleCloseDrawer}
          visible={visible}
        >
          <Form
            title="Especialidad"
            layout="vertical"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label="Nombre:" required>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="error-field">{formik.errors.name}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="Estado:">
              <Radio.Group
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
              >
                <Radio.Button value={true}>ACTIVO</Radio.Button>
                <Radio.Button value={false}>INACTIVO</Radio.Button>
              </Radio.Group>
              {formik.errors.state && formik.touched.state ? (
                <div className="error-field">{formik.errors.state}</div>
              ) : null}
            </Form.Item>
              {
                editar? (
                <Button type="primary" htmlType="submit" block> Actualizar</Button>
                ) : <Button type="primary" htmlType="submit" block> Registrar</Button>
              }
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

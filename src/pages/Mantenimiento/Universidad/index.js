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
import { createSchool, getSchools, actualizarSchool } from "../../../services/SchoolService";
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

export const Universidad = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editar, setEditar] = useState(false);
  const [filterTable, setFilterTable] = useState(null);  
  const [dataSource, setDataSource] = useState([]);

  const listar = () => {
    getSchools().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
      });
      setDataSource(resp);
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z ]*$/, "Solo se admiten letras.")
      .required("Nombre requerido."),
    shortName: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-Z ]*$/, "Solo se admiten letras.")
      .required("Nombre Abreviado requerido."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      shortName: "",
      status: true,
    },
    validationSchema,
    onSubmit: (value) => {
      console.log(value);
      if(editar){
        createSchool(value).then((resp) => {
          console.log(resp);
          listar();
          setVisible(false);
          openNotification("Actualizado Correctamente", "", "topRight");
        });
      }else{
        createSchool(value).then((resp) => {
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
      width: 50,
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
      title: "Nombre Abreviado",
      dataIndex: "shortName",
      key: "shortName",
      width: 170,
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
        // <Button type="link" size="small">
        //   <EditOutlined />
        // </Button>
         <Button type="primary" size="large" onClick={() => 
          {             
            formik.values.name = record.name;
            formik.values.shortName = record.shortName;
            formik.values.status = record.status;
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
            <Breadcrumb.Item>Universidad</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button type="primary" size="large" onClick={() =>           
          {
            formik.values.name = null;
            formik.values.shortName = null;
            formik.values.true = null;
            formik.values.id = null;
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
          title="Agregar Universidad"
          placement="right"
          closable={false}
          width={400}
          onClose={handleCloseDrawer}
          visible={visible}
        >
          <Form
            title="Universidad"
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
            <Form.Item label="Nombre Abreviado:" required>
              <Input
                name="shortName"
                value={formik.values.shortName}
                onChange={formik.handleChange}
              />
              {formik.errors.shortName && formik.touched.shortName ? (
                <div className="error-field">{formik.errors.shortName}</div>
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

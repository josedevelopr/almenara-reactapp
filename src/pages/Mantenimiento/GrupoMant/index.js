import React, { useEffect, useState } from "react";
import {
  Breadcrumb, Modal, Select ,
  Button,
  Drawer,
  Input,
  Table,
  Tag,
  Form,
  Radio,
  notification,
  AutoComplete,
} from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { createSchool, getSchools, actualizarSchool } from "../../../services/SchoolService";
import { getDoctors, getDoctorsByTeam, getDoctorsByTeamTipo, getTeamIdCategoriaTodos, getFindAllByTeamIdGrupo, findAllTipos, 
  createDoctor, createDoctorGrupo, borrarDoctorGrupo } from "../../../services/DoctorService";

  import { getTeams, createTeams, actualizarTeams, guardar, registrar } from "../../../services/TeamService";

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

export const GrupoMant = () => {
  const [loading, setLoading] = useState(false);  
  const [visible, setVisible] = useState(false);
  const [editar, setEditar] = useState(false);
  const [placeCategoria, setPlaceCategoria] = useState('Seleccione una Categoría');
  const [categoriaslst, setCategoriaslst] = useState([]);
  const [filterTable, setFilterTable] = useState(null);  
  const [dataSource, setDataSource] = useState([]);
  const [categoriaId, setCategoria] = useState(null);  
  const [idTeam, setIdTeam] = useState(null);

  const listar = () => {
    getTeams().then((resp) => {
      resp.forEach((data) => {
          data.key = data.id;         
          if(data.tipo != null) {
            if(data.tipo.id != null){
              data.tipoId = data.tipo.id;
            }
            if(data.tipo.name != null){
              data.tipoName = data.tipo.name;
            }
          }                    
      });
      setDataSource(resp);
    });
  };

  const validationSchema = Yup.object().shape({
     
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      shortName: "",
      status: true,
    },
    validationSchema,
    onSubmit: (value) => {
      value.tipoId = categoriaId;


      if(value.name == null){
        openNotification("Debe ingresar un nombre", "", "topLeft");
        return;
      }

      if(value.name.trim() == ''){
        openNotification("Debe ingresar un nombre", "", "topLeft");
        return;
      }

      if(value.tipoId == null){
        openNotification("Debe seleccionar una Categoría", "", "topLeft");
        return;
      }

      console.log(value);
      if(editar){
        guardar(value.id, value.name, value.tipoId).then((resp) => {
          console.log(resp);
          listar();
          setVisible(false);
          openNotification("Actualizado Correctamente", "", "topRight");
        });
      }else{
        registrar(value.name, value.tipoId).then((resp) => {
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
      title: "# Categoría",
      dataIndex: "tipoId",
      key: "tipoId",
      width: 170,
      align: "center",
    },
    {
      title: "Categoría",
      dataIndex: "tipoName",
      key: "tipoName",
      width: 170,
      align: "center",
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
            formik.values.tipoId = record.tipoId;
            formik.values.tipoName = record.tipoName;
            formik.values.id = record.id;            

            setPlaceCategoria(record.tipoName);
            setCategoria(record.tipoId);

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

  const hanldeSelectCategoria = (e) => {
    console.log(e);
    if(e == 1){
      setPlaceCategoria('Medicina');
      setCategoria(e);
    }
    if(e == 2){
      setPlaceCategoria('Cirugía');
      setCategoria(e);      
    }
};

  useEffect(() => {
    setLoading(false);
    setIdTeam(null);

    findAllTipos().then( x =>
      {  
        setCategoriaslst(x);
      }
      );

    listar();
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Mantenimiento</Breadcrumb.Item>
            <Breadcrumb.Item>Grupo</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button type="primary" size="large" onClick={() =>           
          {
            formik.values.name = null;
            formik.values.tipoId = null;
            formik.values.tipoName = null;
            formik.values.id = null;
            
            setCategoria(null);
            setPlaceCategoria('Seleccione');
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
          title="Agregar Grupo"
          placement="right"
          closable={false}
          width={400}
          onClose={handleCloseDrawer}
          visible={visible}
        >
          <Form
            title="Grupo"
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
            {/* TIPOS */}

            <Form.Item label="Categoría">
            <Select
              showSearch
              name="cateogria"
              placeholder= {placeCategoria}
              optionFilterProp="children"
              style={{ width: "300px"}}
              value={formik.values.categoria}
              onChange={hanldeSelectCategoria}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
                {categoriaslst.map((data) => (
                <Select.Option key={data.name} value={data.id}>
                {data.name}
                </Select.Option>
                ))}
            </Select>
          </Form.Item>
    
            
            {/* <Form.Item label="Estado:">
              <Radio.Group
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <Radio.Button value={true}>ACTIVO</Radio.Button>
                <Radio.Button value={false}>INACTIVO</Radio.Button>
              </Radio.Group>
            </Form.Item> */}

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

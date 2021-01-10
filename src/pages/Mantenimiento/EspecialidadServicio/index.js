import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Drawer,
  Input,
  Table,
  Tag,
  Form,
  notification,
  Tooltip,
  Select,
} from "antd";
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { getServicesBySpeciality, addServiceToSpeciality, removeServiceToSpeciality, getActiveServices } from "../../../services/ServicioService";
import { getSpecialtiesDto } from "../../../services/SpecialtyService";

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

const openErrorNotification = (msg, description, placement) => {
    notification.error({
      message: msg,
      description: description,
      placement,
    });
  };

export const EspecialidadServicio = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editar, setEditar] = useState(false);
  const [filterTable, setFilterTable] = useState(null);  
  const [dataSource, setDataSource] = useState([]);
  const [filterServiceTable, setFilterServiceTable] = useState(null);  
  const [dataServiceSource, setDataServiceSource] = useState([]);
  const [services, setServices] = useState([]);
  const [addNewService, setAddNewService] = useState(false);
  const [delSpeciliaty, setDelSpeciliaty] = useState(null);

  const listar = () => {

    getSpecialtiesDto().then((resp) => {
        resp.forEach((data) => {
          data.key = data.id;
        });
        console.log(resp);
        setDataSource(resp);
    });
  };

  const validationSchema = Yup.object().shape({
    servicioId: Yup.string()
        .required("Seleccione un Servicio"),
  });

  const formik = useFormik({
    initialValues: {
        servicioId: null,
        specialityId: null,
    },
    validationSchema,
    onSubmit: (value) => {
      console.log(value);    
      addServiceToSpeciality(value).then((resp) => {
        console.log(resp);
        //listar();
        //setVisible(false);
        editSpeciality(value.specialityId);
        openNotification("Servicio agregado correctamente", "", "topRight");
      });
      
      formik.resetForm();
      setAddNewService(false)
     },
  });

  const editSpeciality = (specialityId) => {
    setEditar(true);
    setDelSpeciliaty(specialityId);
    // console.log(specialityId);
    getServicesBySpeciality(specialityId).then((resp) => {
        getActiveServices(specialityId).then(setServices).catch(err => console.log(err));
        resp.forEach((data) => {
            data.key = data.id;
        });
        console.log(resp);
        setDataServiceSource(resp);
        setVisible(true);
    }).catch(error => console.log(error));
  };

  const removeSpeciality = (serviceId) => {
    
    console.log(serviceId);
    
    removeServiceToSpeciality(delSpeciliaty, serviceId)
    .then( (data) => { 
        openNotification("Servicio eliminado correctamente", "", "topRight"); 
        editSpeciality(delSpeciliaty);
    }).catch( (error) => {
        openErrorNotification("Error al eliminar el servicio.", "", "topRight"); console.log(error);
    } )
  };

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
         <Button type="primary" size="large" onClick={() => 
          {             
            formik.values.name = record.name;
            formik.values.specialityId = record.id; 
            editSpeciality(record.id);           
          }
         
         }>
        <EditOutlined />
       </Button>
      ),
    },
  ];

  const servicesColumns = [
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
        <Button type="danger" size="large" onClick={() => removeSpeciality(record.id)}>
        <Tooltip title="Quitar servicio">
            <DeleteOutlined />
        </Tooltip>        
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
            <Breadcrumb.Item>Asignar Servicios a Especialidad</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
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
          title={"Listado de Servicios por Especialidad"}
          placement="right"
          closable={false}
          width={900}
          onClose={handleCloseDrawer}
          visible={visible}
        >
          <Form
            title="Servicio"
            layout="vertical"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label="Nombre de Servicio:" >
              <Input
                value={formik.values.name}
                disabled={true}  
                style={{width: "calc(100% - 32px)"}}
              />              
                <Tooltip placement="topLeft" title="Añadir un servicio">
                    <Button type="link" size="small">
                        <PlusCircleOutlined  onClick={() => setAddNewService(!addNewService)}/>
                    </Button>
                </Tooltip>
                <Input
                    name="specialityId"
                    value={formik.values.specialityId}
                    disabled={true}  
                    style={{display: "none"}}
                />    
            </Form.Item>   
            { addNewService ? (
            <div>                       
                <Form.Item label="Servicio:" required>
                    <Select
                        showSearch
                        name="servicioId"
                        placeholder="Seleccione un Servicio"
                        optionFilterProp="children"
                        style={{ width: "100%" }}
                        value={formik.values.servicioId}
                        onChange={(text) => formik.setFieldValue("servicioId", text)}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {services.map((data) => (
                        <Select.Option key={data.id} value={data.id}>
                            {data.name}
                        </Select.Option>
                        ))}
                    </Select>
                    {formik.errors.servicioId && formik.touched.servicioId ? (
                        <div className="error-field">{formik.errors.servicioId}</div>
                    ) : null}                    
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Agregar Servicio
                </Button>
            </div> 
            )
             : (<br/>) }
            <br/>
            <Form.Item>
                <Table
                    loading={loading}
                    dataSource={filterServiceTable === null ? dataServiceSource : filterServiceTable}
                    columns={servicesColumns}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 800 }}
                />
            </Form.Item>        
          </Form>          
        </Drawer>
      </div>
    </div>
  );
};

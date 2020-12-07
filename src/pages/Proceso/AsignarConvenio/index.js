import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Drawer, Input, Table, Tag, Form } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

import "../../Mantenimiento/Mantenimiento.css";

const data = [
  {
    id: 1,
    key: 1,
    city: "Callao",
    school: "Universidad San Marcos",
    subscribe: "02/21/2020",
    vencimiento: "02/21/2020",
    status: true,
  },
  {
    id: 1,
    key: 2,
    city: "San Juan de Lurigancho",
    school: "San Martin de Porres",
    subscribe: "02/21/2020",
    vencimiento: "02/21/2020",
    status: false,
  },
];

export const AsignarConvenio = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "left",
    },
    {
      title: "Ubicación (Sede Principal)",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Institución Educativa",
      dataIndex: "school",
      key: "school",
    },
    {
      title: "Subscrito",
      dataIndex: "subscribe",
      key: "subscribe",
    },
    {
      title: "Vencimiento",
      dataIndex: "vencimiento",
      key: "vencimiento",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
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
      render: (record) => (
        <Button type="link" size="small">
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

  useEffect(() => {
    setLoading(false);
    setDataSource(data);
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Proceso</Breadcrumb.Item>
            <Breadcrumb.Item>Asignar Convenio</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button type="primary" size="large" onClick={() => setVisible(true)}>
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
          title="Agregar Convenio"
          placement="right"
          closable={false}
          width={500}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <Form>
            <Form.Item label="">

            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

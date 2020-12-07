import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Table, Tag } from "antd";
import { EditOutlined, FilePdfTwoTone } from "@ant-design/icons";
import { getDoctors, viewPdfDoctor } from "../../../services/DoctorService";

import "../../Mantenimiento/Mantenimiento.css";

export const MedicoReporte = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const listar = () => {
    getDoctors().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
        data.schoolName = data.schoolAgreement.school.shortName;
        data.specialtyName = data.specialty.name;
        data.plazaName = data.plaza.name;
        data.campusName = data.campus.name;
        data.lastName = data.paternalSurname + " " + data.maternalSurname;
      });
      setDataSource(resp);
      console.log(resp);
    });
  };

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
        <Button type="link" size="small">
          <EditOutlined />
        </Button>
      ),
    },
  ];

  const exportToPdf = () => {
    console.log("hello pdf");
    viewPdfDoctor();
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
            <Breadcrumb.Item>Reporte</Breadcrumb.Item>
            <Breadcrumb.Item>Médico</Breadcrumb.Item>
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
        <a href="http://localhost:8080/doctors/pdf" rel="noreferrer" target="_blank">
          <Button
            className="d-flex justify-content-center align-items-center"
            type="dashed"
            icon={<FilePdfTwoTone twoToneColor="#ff0039" />}
          />
        </a>
      </header>
      <div className="content">
        <Table
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 2000 }}
        />
      </div>
    </div>
  );
};

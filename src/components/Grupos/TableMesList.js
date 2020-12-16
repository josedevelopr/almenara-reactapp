import React, { useEffect, useState } from "react";
import { Button, Form, Select } from "antd";
import { TableMes } from "./TableMes";

let periodoData = [
  {
    numMes: 7,
    nameMes: "Julio",
    year: 2019,
  },
  {
    numMes: 8,
    nameMes: "Agosto",
    year: 2019,
  },
  {
    numMes: 9,
    nameMes: "Septiembre",
    year: 2019,
  },
  {
    numMes: 10,
    nameMes: "Octubre",
    year: 2019,
  },
  {
    numMes: 11,
    nameMes: "Noviembre",
    year: 2019,
  },
  {
    numMes: 12,
    nameMes: "Diciembre",
    year: 2019,
  },
  {
    numMes: 1,
    nameMes: "Enero",
    year: 2020,
  },
  {
    numMes: 2,
    nameMes: "Febrero",
    year: 2020,
  },
  {
    numMes: 3,
    nameMes: "Marzo",
    year: 2020,
  },
  {
    numMes: 4,
    nameMes: "Abril",
    year: 2020,
  },
  {
    numMes: 5,
    nameMes: "Mayo",
    year: 2020,
  },
  {
    numMes: 6,
    nameMes: "Junio",
    year: 2020,
  },
];

export const TableMesList = () => {
  const [numMes, setNumMes] = useState(null);
  const [periodo, setPeriodo] = useState([]);
  // const [filter, setFilter] = useState([]);

  const clearFilter = () => {
    setNumMes(null);
    setPeriodo(periodoData);
  };
  const handleSelectMes = (e) => {
    setNumMes(e);
    setPeriodo(periodoData.filter((data) => (data.numMes === e)));
  };

  useEffect(() => {
    setPeriodo(periodoData);
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Form.Item label="Año Académico">
          <Select
            name="anio"
            placeholder="Seleccione un año"
            optionFilterProp="children"
            style={{ width: "150px", marginRight: '10px' }}
            value="R1"
          >
              <Select.Option value="R1">
                2019 - 2020
              </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mes">
          <Select
            showSearch
            name="numMes"
            placeholder="Seleccione una mes"
            optionFilterProp="children"
            style={{ width: "300px" }}
            value={numMes}
            onChange={handleSelectMes}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {periodoData.map((data) => (
              <Select.Option key={data.numMes} value={data.numMes}>
                {data.nameMes}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ marginLeft: "10px" }}>
          <Button type="ghost" onClick={clearFilter}>
            Limpiar
          </Button>
        </Form.Item>
      </Form>
      <div>
        {periodo.map((data) => (
          <TableMes
            key={data.numMes}
            mesName={data.nameMes}
            mesNum={data.numMes}
            year={data.year}
          />
        ))}
      </div>
    </div>
  );
};

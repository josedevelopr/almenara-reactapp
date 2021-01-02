import React, { useEffect, useState } from "react";
import { Button, Form, Select } from "antd";
import { TableMes } from "./TableMes";
import { findAllTipos } from "../../services/DoctorService";
import { getAllAnioAcademico } from "../../services/AnioAcademicoService";
import { getAllMesDiaFiltrar } from "../../services/MesDiaService";

let aniosAcademicos = [];

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
  
  const [idAnio, setIdAnio] = useState(null);   


  const [placeCategoria, setPlaceCategoria] = useState('Seleccione una Categoría');
  const [idTeam, setIdTeam] = useState(null);
  const [categoriaId, setCategoria] = useState(null);  
  const [categoriaslst, setCategoriaslst] = useState([]);
  
  const [anioAcademicolst, setAnioAcademicolst] = useState([]);
  const [anioAcademicoCombo, setAnioAcademicoCombo] = useState([]);

  const [mes, setMes] = useState(-5);
  const [anio, setAnio] = useState(-5);
  const [cate, setCate] = useState(-5);  

  // const [filter, setFilter] = useState([]);

  const clearFilter = () => {
    setNumMes(null);    
    setMes(-5);
    setPeriodo([]);
  };
  const handleSelectMes = (e) => {
    setNumMes(e);
    setPeriodo(periodoData.filter((data) => (data.numMes === e)));
    setMes(e);
    getAllMesDiaFiltrar(anio, e, cate).then( x => {
      setPeriodo(x);      
    });

  };

  const handleSelectAnioAcademico = (e) => {
    setIdAnio(e);
    setAnioAcademicoCombo(anioAcademicolst.filter((data) => (data.id === e)));
    setAnio(e);
    getAllMesDiaFiltrar(e, mes, cate).then( x => {
      setPeriodo(x);       
    });

  };

  const hanldeSelectCategoria = (e) => {
      console.log(e);
      setCategoria(e);
      cargarListado(e);         
      setCate(e);      
      getAllMesDiaFiltrar(anio, mes, e).then( x => {
        
      

        setPeriodo(x);       
      });
      
    // }
    // if(e == 2){
    //   setPlaceCategoria('Cirugía');
    //   setCategoria(e);
    //   cargarListado(e);
    // }
};

const cargarListado = (cate) => {
  // getDoctorsByTeamTipo(1, cate).then( x => {
  //   console.log(x);
  //   setTeam1(x) ;
  // });
};

  useEffect(() => {

    getAllAnioAcademico().then( x => {
      setAnioAcademicolst(x);      
    }); 

    setPeriodo([]);

    findAllTipos().then( x =>
      {  
        setCategoriaslst(x);
      }
    );


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
            showSearch
            name="idAnio"
            placeholder="Seleccione un año"
            optionFilterProp="children"
            style={{ width: "300px",  marginRight: '10px' }}
            value={idAnio}
            onChange={handleSelectAnioAcademico}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {anioAcademicolst.map((data) => (
              <Select.Option key={data.id} value={data.id}>
                {data.anioInicio + " - " + data.anioFinal} 
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Categoría">
            <Select
              showSearch
              name="cateogria"
              placeholder= {placeCategoria}
              optionFilterProp="children"
              style={{ width: "300px"}}
              value={categoriaId}
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

        <Form.Item label="Mes">
          <Select
            showSearch
            name="numMes"
            placeholder="Seleccione una mes"
            optionFilterProp="children"
            style={{ width: "300px",  marginRight: '10px' }}
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
          // console.log(data)
          //  <p>{data.id}</p>
            <TableMes
              keyId={data.key}
              mesName={data.nombreMes}
              mesNum={data.idMes}
              year={data.anio}
            />
        ))}


      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { FilePdfTwoTone, EditOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import { TableMes } from "./TableMes";
import { findAllTipos } from "../../services/DoctorService";
import { getAllAnioAcademico } from "../../services/AnioAcademicoService";
import { getAllMesDiaFiltrar, viewPdfServicioMesDia } from "../../services/MesDiaService";
import { getTeams } from "../../services/TeamService";

let aniosAcademicos = [];
let teams = [];

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

  const [lstPeriodo, setLstPeriodo] = useState([]);
  
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
    setMes(-5);
    var lstMain = [];
    // setLstPeriodo(lstMain);    
  };

  function clear() {
    var lstMain = [];
    // setLstPeriodo(lstMain);    
  }
  
  const exportarPeriodo = () => { 
    viewPdfServicioMesDia(lstPeriodo);    
  };  

  const handleSelectMes = (e) => {

    setNumMes(e);
    setPeriodo(periodoData.filter((data) => (data.numMes === e)));
    setMes(e);
    var lst = [];
    getAllMesDiaFiltrar(anio, e, cate).then( x => {            
      lst.push(x[0]);
      setLstPeriodo(lst);
    });
  };

  const handleSelectAnioAcademico = (e) => {
   
    setIdAnio(e);
    setAnioAcademicoCombo(anioAcademicolst.filter((data) => (data.id === e)));
    setAnio(e);


    if(cate != -5){

      if(mes == -5){
        var lst = [];
        var itemsProcessed = 0;
        periodoData.forEach( per => {
          getAllMesDiaFiltrar(e, per.numMes, cate).then( x => {
            lst.push(x[0]);
            itemsProcessed++;
            if(itemsProcessed === periodoData.length) {
              lst.sort(function(a, b) {
                var keyA = a.anio,
                  keyB = b.anio;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              });

              
              setLstPeriodo(lst);
            }
        
          });
        })
      }else{
        getAllMesDiaFiltrar(e, mes, cate).then( x => {
          lst = [];
          lst.push(x[0]);
            setLstPeriodo(lst);   
          
        });
      }
    };
    }


  const hanldeSelectCategoria = (e) => {
   
      setCategoria(e);
      cargarListado(e);         
      setCate(e);   
      if(mes == -5){
        var lst = [];
        var itemsProcessed = 0;
        periodoData.forEach( per => {
          getAllMesDiaFiltrar(anio, per.numMes, e).then( x => {
            lst.push(x[0]);
            itemsProcessed++;
            if(itemsProcessed === periodoData.length) {
      

              lst.sort(function(a, b) {
                var keyA = a.anio,
                  keyB = b.anio;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              });

              setLstPeriodo(lst);
            }
          });
          
        });        

      }else{
        getAllMesDiaFiltrar(anio, mes, e).then( x => {
          lst = [];
          lst.push(x[0]);
            setLstPeriodo(lst);
        });
      }
    
};

const cargarListado = (cate) => {
};

  useEffect(() => {


    getTeams().then((resp) => {
      resp.forEach((data) => {
        teams.push(data.id);
      });      
    });
  

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
                <Select.Option key={data.name} value={data.id} >
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

        <Button
          type="dashed"
          color="red"
          size="large"
          danger
          onClick={exportarPeriodo}
        >
          <FilePdfTwoTone twoToneColor="red" /> Exportar a PDF
        </Button>

        </Form.Item>
      </Form>
      <div>      

       {lstPeriodo.map((data) => (         
            <TableMes key={data.key} dataTabla={data} listaGrupos={teams}>
            </TableMes>
        ))} 

      </div>
    </div>
  );


  

};

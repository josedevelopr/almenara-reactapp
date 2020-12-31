import React, { useEffect, useState } from "react";
import { } from "antd";
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
import { getDoctors, getDoctorsByTeam, getDoctorsByTeamTipo, getTeamIdCategoriaTodos, getFindAllByTeamIdGrupo, findAllTipos, 
  createDoctor, createDoctorGrupo, borrarDoctorGrupo } from "../../../services/DoctorService";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Grupo.css";

export const Grupo = () => {
  const [team1, setTeam1] = useState([]);
  const [categoriaslst, setCategoriaslst] = useState([]);
  const [doctoreslst, setDoctoreslst] = useState([]);  
  const [editar, setEditar] = useState(false);  
  const [visible, setVisible] = useState(false);
  const [categoriaId, setCategoria] = useState(null);  
  const [placeCategoria, setPlaceCategoria] = useState('Seleccione una Categoría');
  const [placeNombre, setPlaceNombre] = useState('Seleccione un Médico');
  const [placeGrupo, setPlaceGrupo] = useState('Seleccione un Grupo');
  const [idTeam, setIdTeam] = useState(null);
  var grupoDoctores = [];

 
  const hanldeSelectTeam = (e) => {
    // setGrupoDoctores([]);
    getFindAllByTeamIdGrupo(e, categoriaId).then( x =>
      {
        console.log(x);        
        grupoDoctores = x;

        Modal.info({
          title: "Asignar Grupo",
          content: (
            <div>
            {grupoDoctores.map((data) => (              
            <table className="table table-striped table-hover">
              <thead>
                <tr>               
                  <th>Doctor</th>
                  <th>Especialidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                      {data.doctores.map((data2) => (
                        <tr>

                        {
                          data2.nivel.id == 1? (
                            <td style={{textAlign: 'left', backgroundColor:'#CAFFB3'}}>- {data2.paternalSurname} {data2.maternalSurname}, {data2.name}</td>
                          ): data2.nivel.id == 2? (
                            <td style={{textAlign: 'left', backgroundColor:'#FFFFB3'}}>- {data2.paternalSurname} {data2.maternalSurname}, {data2.name}</td>
                          ):(
                            <td style={{textAlign: 'left', backgroundColor:'#FFBBB3'}}>- {data2.paternalSurname} {data2.maternalSurname}, {data2.name}</td>
                          )
                        }

                        {
                          data2.nivel.id == 1? (                            
                            <td style={{textAlign: 'left', backgroundColor:'#CAFFB3'}}>{data2.specialty.name}</td>
                          ): data2.nivel.id == 2? (                            
                            <td style={{textAlign: 'left', backgroundColor:'#FFFFB3'}}>{data2.specialty.name}</td>
                          ):(                            
                            <td style={{textAlign: 'left', backgroundColor:'#FFBBB3'}}>{data2.specialty.name}</td>
                          )
                        }
                          
                          <td key="edit">
                            <Button type="primary" size="large" onClick={() => 
                                {             
                                  formik.values.name = data2.name;             
                                  formik.values.team = data2.team.id;
                                  formik.values.id = data2.id;  
                                  console.log(data2); 
                                  setEditar(true);                               
                                  setVisible(true);
                                }
                              }>
                              <EditOutlined />
                            </Button>        
                            </td>
                        </tr>
                      ))}
              </tbody>
            </table>            
            ))}
          </div>
          ),
          onOk() {},
        });
  
      }
      );  
  };

  const handleCloseDrawer = () => {
    setVisible(false);
    formik.resetForm();
  };

  const editarMedico = (e) => {
    console.log(e);
  }

  
  const hanldeSelectNombre = (e) => {
    console.log(e);
    console.log(e.nativeEvent);    
    console.log(e.nativeEvent.data);
    
    formik.values.name = e.nativeEvent.data;

};

  const hanldeSelectCategoria = (e) => {
      console.log(e);
      if(e == 1){
        setPlaceCategoria('Medicina');
        setCategoria(e);
        cargarListado(e);        
      }
      if(e == 2){
        setPlaceCategoria('Cirugía');
        setCategoria(e);
        cargarListado(e); 
      }
  };

  
  
  const hanldeSelectNombreMedico = (e) => {
    console.log(e);
        
    doctoreslst.find(x => {
      if(x.id == e){        
        formik.values.name = x.name;
        formik.values.id = e;
        setPlaceNombre(formik.values.name);
      }
    });

};


  const hanldeSelectTeama = (e) => {
    console.log(e);
    console.log(formik.values.team);

    team1.find(x => {

      if(x.idGrupo == e){
        setPlaceGrupo(x.nombreGrupo);
      }

    });

    
    formik.values.team  = e;
    
};

  useEffect(() => {
    setIdTeam(null);
    cargarDoctores();

    findAllTipos().then( x =>
      {  
        setCategoriaslst(x);
      }
      );

      getTeamIdCategoriaTodos().then( x => {
        setTeam1(x);
      });


  }, []);

  
const cargarListado = (cate) => {
    getDoctorsByTeamTipo(1, cate).then( x => {
      console.log(x);
      setTeam1(x) ;
    });
};

const validationSchema = Yup.object().shape({
  // name: Yup.string()
  //   .trim()
  //   .matches(/^[ñÑa-zA-Z ]*$/, "Solo se admiten letras.")
  //   .required("Nombre requerido."),
  // shortName: Yup.string()
  //   .trim()
  //   .matches(/^[ñÑa-zA-Z ]*$/, "Solo se admiten letras.")
  //   .required("Nombre Abreviado requerido."),
});


const openNotification = (msg, description, placement) => {
  notification.success({
    message: msg,
    description: description,
    placement,
  });
};


const formik = useFormik({
  initialValues: {
    name: "",
    shortName: "",
    status: true,
  },
  validationSchema,
  onSubmit: (value) => {
    console.log(value);
  
    createDoctorGrupo(value.id, value.name, value.team).then((resp) => {
         console.log(resp);                
         setVisible(false);
         cargarListado(categoriaId);
         openNotification("Guardado Correctamente", "", "topRight");
       });
   
   
    
    formik.resetForm();
  },
});



  const borrarDoctor = (id) => {
    borrarDoctorGrupo(id).then((resp) => {
      console.log(resp);
      setVisible(false);
      cargarListado(categoriaId);
      openNotification("Eliminado Correctamente", "", "topRight");
    });
  }

  const cargarDoctores = () => {
    getDoctors().then((resp) => {    
      var resp2 = [];
      resp.forEach(element => {
        if(element.status){
          resp2.push(element);
        }
      });
      
      setDoctoreslst(resp2);
    });
  }
  


  return (
    <div className="mantenimiento">
      <header>       
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Mantenimiento</Breadcrumb.Item>
            <Breadcrumb.Item>Asignar Grupos</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button type="primary" size="large" onClick={() =>           
          {
            formik.values.name = null;
            formik.values.shortName = null;
            formik.values.true = null;
            formik.values.id = null;
            cargarDoctores();
            setEditar(false);
            setVisible(true);
          }
          }>
          <PlusOutlined /> Agregar
        </Button>
      </header>
      <div className="content">
        {/* TIPOS */}
        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Form.Item label="Categoría">
            <Select
              showSearch
              name="cateogria"
              placeholder= {placeCategoria}
              optionFilterProp="children"
              style={{ width: "300px", marginLeft: "45px" }}
              value={idTeam}
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
        </Form>
        
        {/* //grupos */}
        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Form.Item label="Filtrar por Grupo">
            <Select
              showSearch
              name="specialty"
              placeholder="Seleccione un Grupo"
              optionFilterProp="children"
              style={{ width: "300px" }}
              value={idTeam}
              onChange={hanldeSelectTeam}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }>
            {team1.map((data) => (
              <Select.Option key={data.idGrupo} value={data.idGrupo}>
             {data.nombreGrupo}
              </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
          

              <p >Leyenda de colores: Residente Nivel 1:  
                <span style={{color: "#CAFFB3", border: "1px solid black", borderRadius:"10px", paddingLeft: "10px", paddingRight:"10px", color:"black", backgroundColor:"#CAFFB3", marginLeft:"5px", marginRight:"5px"}}></span>
                  | Residente Nivel 2: 
                <span style={{color: "#FFFFB3", border: "1px solid black", borderRadius:"10px", paddingLeft: "10px", paddingRight:"10px", color:"black", backgroundColor:"#FFFFB3", marginLeft:"5px", marginRight:"5px"}}></span>
                   | Residente Nivel 3:
                <span style={{color: "#FFBBB3", border: "1px solid black", borderRadius:"10px", paddingLeft: "10px", paddingRight:"10px", color:"black", backgroundColor:"#FFBBB3", marginLeft:"5px", marginRight:"5px"}}></span>
                   </p>

        <div
          className="table-group table-responsive"
          style={{ textAlign: "center", display: "flex" }}>

            {team1.map((data) => (
                <table className="table table-striped table-hover" border="1" style={{width: "340px", marginRight: "10px"}}>
                <thead>
                  <tr >
                    <th> {data.nombreGrupo}</th>
                    <th> Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data.doctores.map((data2) => (
                    <tr >
                       {
                data2.nivel.id == 1? (
                    <td key={data2.id} style={{textAlign: 'left', backgroundColor:'#CAFFB3'}}>
                    {data2.name} {data2.paternalSurname}
                    </td>
                ): data2.nivel.id == 2? (
                  <td key={data2.id} style={{textAlign: 'left', backgroundColor:'#FFFFB3'}}>
                  {data2.name} {data2.paternalSurname}
                  </td>
                ):(
                  <td key={data2.id} style={{textAlign: 'left', backgroundColor:'#FFBBB3'}}>
                  {data2.name} {data2.paternalSurname}
                  </td>
                )
              }
                                                                  
                      <td key="edit">

                      <Button type="primary" size="large" onClick={() => 
                          {                    
                            formik.values.name = data2.name;             
                            formik.values.team = data2.team.id;
                            formik.values.id = data2.id;
                            console.log(data2);
                            setEditar(true);
                            setVisible(true);          
                          }
                        
                        }>
                        <EditOutlined />
                      </Button>        

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              ))}
      
        </div>
      </div>


      <Drawer
          title="Médico"
          placement="right"
          closable={false}

          width={400}
          onClose={handleCloseDrawer}
          visible={visible}
        >
          <Form
            title="Medico"
            layout="vertical"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label="Nombre:" required>

            {
                editar? (
              
                  <Input
                  name="name"
                  disabled                 
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                ) :    
                <Select
              showSearch
              name="medico"
              placeholder= {placeNombre}
              optionFilterProp="children"
              style={{ width: "300px"}}
              value={formik.values.name}
              onChange={hanldeSelectNombreMedico}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
                {doctoreslst.map((data) => (
                <Select.Option key={data.id} value={data.id}>
                {data.name}
                </Select.Option>
                ))}
            </Select>
              } 
                {formik.errors.name && formik.touched.name ? (
                  <div className="error-field">{formik.errors.name}</div>
                ) : null}
            </Form.Item>
           
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

          <Form.Item label="Grupo">
            <Select
              showSearch
              name="specialty2"
              placeholder="Seleccione un Grupo"
              optionFilterProp="children"
              style={{ width: "300px" }}
              value={formik.values.team}
              onChange={hanldeSelectTeama}  
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }>
            {team1.map((data) => (
              <Select.Option key={data.nombreGrupo} value={data.idGrupo}>
             {data.nombreGrupo}
              </Select.Option>
              ))}
            </Select>
          </Form.Item>

               {
                editar? (
                <Button type="primary" htmlType="submit"  block> Actualizar</Button>
                ) : <Button type="primary" htmlType="submit"  block> Registrar</Button>
              } 
              <Button type="danger" 
              onClick={() => 
                {     console.log(formik.values.idta2); 
                  borrarDoctor(formik.values.id);           
                
                }
              }
              block> Eliminar</Button>

            
          </Form>
        </Drawer>

    </div>



  );
};

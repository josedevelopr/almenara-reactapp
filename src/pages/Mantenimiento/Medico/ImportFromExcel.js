import React, { Component } from 'react';
import { Modal, Button } from "antd";
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import {Container, Row, Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Fade, FormFeedback, Card } from 'reactstrap';
import * as Yup from "yup";
import moment from "moment";
import './ImportFromExcel.css';

const validationDoctorData = Yup.object().shape({
  document: Yup.string()
    .trim()
    .matches(/^[0-9]*$/, "Solo se admiten números.")
    .length(8, "Se requiere 8 dígitos.")
    .required("DNI requerido."),
  paternalSurname: Yup.string()
    .trim()
    .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
    .required("Apellido Paterno requerido."),
  maternalSurname: Yup.string()
    .trim()
    .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
    .required("Apellido Materno requerido."),
  name: Yup.string()
    .trim()
    .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
    .required("Nombre requerido."),
  schoolAgreement: Yup.object().shape({
    id: Yup.number().nullable().required("Universidad requerida"),
  }),
  specialty: Yup.object().shape({
    id: Yup.number().nullable().required("Especialidad requerida"),
  }),
  plaza: Yup.object().shape({
    id: Yup.number().nullable().required("Plaza requerida."),
  }),
  campus: Yup.object().shape({
    id: Yup.number().nullable().required("Sede requerida."),
  }),
  // team: Yup.object().shape({
  //   id: Yup.number().nullable().required("Grupo requerido."),
  // }),
  address: Yup.string()
    .trim()
    // .matches(
    //   /^[a-zA-Z\s](\d)?$/,
    //   "No se admiten caracteres especiales."
    // ),
    .min(5, "El campo debe tener al menos 5 caracteres.")
    .required("Dirección es un campo requerido"),
  cmp: Yup.string()
    .trim()
    .matches(/^[0-9]*$/, "Solo se admiten números.")
    .min(5, "Solo se admite min. 5 dígitos.")
    .max(6, "Solo se admite máx. 6 dígitos.")
    .required("CMP requerido"),
  email: Yup.string()
    .trim()
    .email("Formato no válido. (ej. correo@example.com)")
    .required("Correo requerido."),
  phone: Yup.string()
    .length(9, "Se requiere 9 dígitos.")
    .required("N° Celular requerido."),
});

class ImportFromExcel extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
    this.saveImportedData = this.saveImportedData.bind(this);
    this.converToDoctor = this.converToDoctor.bind(this);
    this.excelDateToJSDate = this.excelDateToJSDate.bind(this);
    this.cleanState = this.cleanState.bind(this);
  }

  renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          this.setState({
            dataLoaded: true,
            cols: resp.cols,
            rows: resp.rows
          });

          // console.log(resp.rows);
        }
      }); 
  }

  fileHandler = (event) => {    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
      }    
      else{
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }               
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  cleanState(){
    this.setState({
      dataLoaded: false,
      cols: null,
      rows: null,
      uploadedFileName : null
    });
  }

  converToDoctor(row){
    return {
      "id" : null,
      "document" : row[1] == "" || row[1] == null ? "" : row[1].toString(),
      "name" : row[4] == "" || row[4] == null ? "" : row[4],
      "paternalSurname" : row[2] == "" || row[2] == null ? "" : row[2],
      "maternalSurname" : row[3] == "" || row[3] == null ? "" : row[3],
      "plaza" : {
        "id" : row[7].trim().toLowerCase() == "libre" ? 1 : 2,
      },
      "campus" : {
        "id" : row[8],
      },
      "birthDate" : row[9] == "" || row[9] == null ? null : this.excelDateToJSDate(row[9]),
      //"birthDate" : null,
      "address" : row[10] == "" || row[10] == null ? null : row[10],
      "cmp" : row[11] == "" || row[11] == null ? null : row[11].toString(),
      "email" : row[12] == "" || row[12] == null ? "" : row[12],
      "phone" : row[13]  == "" || row[13] == null ? "" : row[13].toString(),
      "schoolAgreement" : {
        "school" : {
          "shortName" : row[5]  == "" || row[5] == null ? null : row[5].toString(),
        }
      },
      "specialty" : {
        "id" : row[6]
      },
      "status" : true,
      "team" : null,
      "nivel" : {
        "id" : 1
      },
      "registeredAt" : row[14] == "" || row[14] == null ? null : this.excelDateToJSDate(row[14]),
    }
  }

  excelDateToJSDate(serial) {
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
 
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
 
    var total_seconds = Math.floor(86400 * fractional_day);
 
    var seconds = total_seconds % 60;
 
    total_seconds -= seconds;
 
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
 
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate()+1, hours, minutes, seconds);
 }

  saveImportedData = () => {
    let lstDoctors = this.state.rows;
    lstDoctors = lstDoctors.filter((doctor, key) => key > 0);
    let transformedArr = lstDoctors.map(this.converToDoctor);
    console.log(transformedArr);
    this.props.onImportdata(transformedArr).then((resp) => {
        console.log(resp);
        this.cleanState();
        this.props.onListDoctors();
        this.props.onOpenNotification("Datos importados correctamente", "", "topRight");
        this.props.onVisibleModal();        
    }).catch(function(err){
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm="4">   
          {this.state.uploadedFileName ? <h3>Cargando archivo "{this.state.uploadedFileName}"</h3> : <h3>Cargar Archivo Excel</h3>}
          </Col>                
          <Col sm="4" >                                                     
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button onClick={this.openFileBrowser.bind(this)} type="primary" size="large"><i ></i> Buscar...</Button>
                  { this.state.dataLoaded &&
                    <Button onClick={this.saveImportedData.bind(this)} type="primary" size="large" style={{marginLeft:"20px"}}><i ></i>Guardar datos</Button>
                  }                  
                  <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event)=> { event.target.value = null }}/>                                
                </InputGroupAddon>
                <Input type="text" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} style={{"display":"none"}}/>                                              
                <FormFeedback>    
                  <Fade in={this.state.isFormInvalid} tag="h6" style={{fontStyle: "italic"}}>
                      ! Selecciona solo un archivo .xlsx !
                  </Fade>                                                                
                </FormFeedback>
            </InputGroup>     
          </Col>
        </Row> 
        {this.state.dataLoaded && 
        <div>
          <Card body outline color="secondary" className="restrict-card">              
              <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />              
          </Card>  
        </div>} 
      </div>
    );
  }
}

export default ImportFromExcel;
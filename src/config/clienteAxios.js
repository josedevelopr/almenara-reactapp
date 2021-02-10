import Axios from "axios";

 const LOCAL = "http://localhost:8080/";
 const URL_NUBE = "https://almenara-api.herokuapp.com/"
 //const URL_NUBE = "https://sistemacontrolmedicoalmenara.com/hospital-almenara-api-0.0.1-SNAPSHOT/"
 

const clienteAxios = Axios.create({
  baseURL: URL_NUBE,
});

export default clienteAxios;
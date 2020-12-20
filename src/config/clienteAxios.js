import Axios from "axios";

 const LOCAL = "http://localhost:8080/";
//const URL_NUBE = "https://hospital-almenara-api.herokuapp.com/"

<<<<<<< HEAD
const clienteAxios = Axios.create({
  baseURL: LOCAL,
=======
const   clienteAxios = Axios.create({
  baseURL: LOCAL ,
>>>>>>> 9faaa85fedb392569fdf81dfe7cd8670887d3bd1
});

export default clienteAxios;

import Axios from "axios";

const LOCAL = "http://localhost:8080/";
const CLOUD = "https://hospital-almenara-api.herokuapp.com/"

const clienteAxios = Axios.create({
  baseURL: CLOUD,
});

export default clienteAxios;

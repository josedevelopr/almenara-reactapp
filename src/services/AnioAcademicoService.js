import clienteAxios from "../config/clienteAxios";

const getAniosAcademicos = async () => {
  const resp = await clienteAxios.get("/anio-academico");
  return resp.data;
};


export {
    getAniosAcademicos
  };
import clienteAxios from "../config/clienteAxios";

const getAllAnioAcademico = async () => {
  const resp = await clienteAxios.get("/anio-academico");
  return resp.data;
};



export { getAllAnioAcademico };

import clienteAxios from "../config/clienteAxios";

const getServicios = async () => {
  const resp = await clienteAxios.get("/servicios");
  return resp.data;
};


export {
    getServicios
  };
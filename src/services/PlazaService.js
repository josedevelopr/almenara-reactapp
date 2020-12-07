import clienteAxios from "../config/clienteAxios";

const getPlazas = async () => {
  const resp = await clienteAxios.get("/plazas");
  return resp.data;
};

export { getPlazas };


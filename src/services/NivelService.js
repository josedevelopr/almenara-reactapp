import clienteAxios from "../config/clienteAxios";

const getNiveles = async () => {
  const resp = await clienteAxios.get("/niveles");
  return resp.data;
};

export { getNiveles };


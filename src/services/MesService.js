import clienteAxios from "../config/clienteAxios";

const getMeses = async () => {
  const resp = await clienteAxios.get("/meses");
  return resp.data;
};

export { getMeses };
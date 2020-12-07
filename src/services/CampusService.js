import clienteAxios from "../config/clienteAxios";

const getCampus = async () => {
  const resp = await clienteAxios.get("/campus");
  return resp.data;
};

export { getCampus };

import clienteAxios from "../config/clienteAxios";

const getTeams = async () => {
  const resp = await clienteAxios.get("/teams");
  return resp.data;
};

export { getTeams };

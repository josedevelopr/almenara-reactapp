import clienteAxios from "../config/clienteAxios";

const getTeams = async () => {
  const resp = await clienteAxios.get("/teams");
  return resp.data;
};

const createTeams = async (data) => {
  const resp = await clienteAxios.post('/teams',data);
  return resp.data;
}


const actualizarTeams = async (data) => {
  const resp = await clienteAxios.post(`/teams/update/${data.id}`,data);
  return resp.data;
}


const guardar = async (id, name, tipo) => {
  const resp = await clienteAxios.put(`/teams/guardar/${id}/${name}/${tipo}`);
  return resp.data;
};

const registrar = async ( name, tipo) => {
  const resp = await clienteAxios.put(`/teams/registrar/${name}/${tipo}`);
  return resp.data;
};


export { getTeams, createTeams, actualizarTeams, guardar, registrar };

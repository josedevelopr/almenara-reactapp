import clienteAxios from "../config/clienteAxios";

async function getRoles() {
  const resp = await clienteAxios.get(`/role`);
  return resp.data;
}

async function getRoleById(id) {
  const resp = await clienteAxios.get(`/role/${id}`);
  return resp.data;
}

export {getRoleById, getRoles};
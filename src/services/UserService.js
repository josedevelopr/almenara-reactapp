import clienteAxios from "../config/clienteAxios";

async function login(data) {
  const resp = await clienteAxios.post(`api/auth/login`, data);
  return resp.data;
}

async function getUsers() {
  const resp = await clienteAxios.get(`/user`);
  return resp.data;
}

async function getUserById(id) {
  const resp = await clienteAxios.get(`/user/${id}`);
  return resp.data;
}

async function createUser(data) {
  const resp = await clienteAxios.post(`/user`, data);
  return resp.data;
}

async function updateUser(data) {
  const resp = await clienteAxios.put(`/user/${data.id}`, data);
  return resp.data;
}

export { login, getUsers, getUserById, createUser, updateUser };

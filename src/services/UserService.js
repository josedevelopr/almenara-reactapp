import clienteAxios from "../config/clienteAxios";

async function login(data) {
  const resp = await clienteAxios.post(`api/auth/login`, data);
  return resp.data;
}

export { login };

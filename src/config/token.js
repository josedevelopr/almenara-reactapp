import clienteAxios from "./clienteAxios";

const tokenAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    clienteAxios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  } else {
    delete clienteAxios.defaults.headers.common["Authorization"];
  }
};
export default tokenAuth;

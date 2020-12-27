import clienteAxios from "../config/clienteAxios";

const updateServicioDelegado = async (data) => {
  const resp = await clienteAxios.put("/servicio-delegado", data);
  return resp.data;
};

export { updateServicioDelegado };

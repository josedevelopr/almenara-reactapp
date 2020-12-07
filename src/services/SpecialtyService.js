import clienteAxios from "../config/clienteAxios";

const getSpecialties = async () => {
  const resp = await clienteAxios.get("/specialties");
  return resp.data;
};

export { getSpecialties };

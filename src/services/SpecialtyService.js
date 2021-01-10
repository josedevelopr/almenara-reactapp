import clienteAxios from "../config/clienteAxios";

const getSpecialties = async () => {
  const resp = await clienteAxios.get("/specialties");
  return resp.data;
};

const getSpecialtiesDto = async () => {
  const resp = await clienteAxios.get("/specialties/simple");
  return resp.data;
};

export { getSpecialties, getSpecialtiesDto };

import clienteAxios from "../config/clienteAxios";

const getSchools = async () => {
  const resp = await clienteAxios.get("/schools");
  return resp.data;
};

const createSchool = async (data) => {
  const resp = await clienteAxios.post('/schools',data);
  return resp.data;
}


const actualizarSchool = async (data) => {
  const resp = await clienteAxios.post(`/schools/update/${data.id}`,data);
  return resp.data;
}

export { getSchools, createSchool, actualizarSchool };

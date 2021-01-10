import clienteAxios from "../config/clienteAxios";

const getServicios = async () => {
  const resp = await clienteAxios.get("/servicios");
  return resp.data;
};

const createServicio = async (newService) => {
  const resp = await clienteAxios.post("/servicios", newService);
  return resp.data;
};

const actualizarServicio = async (newService) => {
  const resp = await clienteAxios.post("/servicios", newService);
  return resp.data;
};

const addServiceToSpeciality = async (req) => {
  const resp = await clienteAxios.post("/servicios/service-to-speciality", req);
  return resp.data;
};

const removeServiceToSpeciality = async (specialityId, serviceId) => {
  const resp = await clienteAxios.delete(`/servicios/service-to-speciality/${specialityId}/${serviceId}`);
  return resp.data;
};

const getServicesBySpeciality = async (specialityId) => {
  const resp = await clienteAxios.get(`/servicios/list-by-speciality/${specialityId}`);
  return resp.data;
};

const getActiveServices = async (idSpeciality) => {
  const resp = await clienteAxios.get(`/servicios/active/${idSpeciality}`);
  return resp.data;
};

export {
    getServicios,
    createServicio,
    actualizarServicio,
    getServicesBySpeciality,
    getActiveServices,
    addServiceToSpeciality,
    removeServiceToSpeciality
  };
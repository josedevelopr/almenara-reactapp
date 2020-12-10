import clienteAxios from "../config/clienteAxios";

const getServiciosDoctor = async () => {
  const resp = await clienteAxios.get("/servicio-doctor");
  return resp.data;
};

const getServiciosDoctorBySpecialtyId = async (id) => {
  const resp = await clienteAxios.get(`/servicio-doctor/${id}`);
  return resp.data;
};

const viewPdfServiciosDoctor = async () => {
  await clienteAxios
    .get("/servicio-doctor/pdf", { responseType: "blob" })
    .then((resp) => {
      const file = new Blob([resp.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
};

const viewPdfServiciosDoctorFilterSpecialty = async (id) => {
  await clienteAxios
    .get(`/servicio-doctor/pdf/${id}`, { responseType: "blob" })
    .then((resp) => {
      const file = new Blob([resp.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
};

export {
  getServiciosDoctor,
  getServiciosDoctorBySpecialtyId,
  viewPdfServiciosDoctor,
  viewPdfServiciosDoctorFilterSpecialty,
};

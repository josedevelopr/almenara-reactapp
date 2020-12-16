import clienteAxios from "../config/clienteAxios";

const getDoctors = async () => {
  const resp = await clienteAxios.get("/doctors");
  return resp.data;
};

const getDoctorsByTeam = async (teamId) => {
  const resp = await clienteAxios.get(`/doctors/teamId/${teamId}`);
  return resp.data;
};

const createDoctor = async (data) => {
  const resp = await clienteAxios.post("/doctors", data);
  return resp.data;
};

const viewPdfDoctor = async () => {
  await clienteAxios
    .get("/doctors/pdf", { responseType: "blob" })
    .then((resp) => {
      const file = new Blob([resp.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
};

export { getDoctors, createDoctor, viewPdfDoctor, getDoctorsByTeam };

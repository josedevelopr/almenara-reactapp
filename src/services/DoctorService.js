import clienteAxios from "../config/clienteAxios";

const getDoctors = async () => {
  const resp = await clienteAxios.get("/doctors");
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
      const url = window.URL.createObjectURL(new Blob([resp.data]));
      // window.open(url, '_blank');
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target",'_BLANK')
      // link.setAttribute("download", "medico.pdf");
      document.body.appendChild(link);
      link.click();
    });
};

export { getDoctors, createDoctor, viewPdfDoctor };

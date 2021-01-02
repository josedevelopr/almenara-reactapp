import clienteAxios from "../config/clienteAxios";

const getAllMesDia = async () => {
  const resp = await clienteAxios.get("/mesdia");
  return resp.data;
};


const getAllMesDiaFiltrar = async (anio, mes, categoria) => {
  const resp = await clienteAxios.get(`/mesdia/filtrar/${anio}/${mes}/${categoria}`);  

  var i = 1;
  resp.data.forEach(element => {
    element.key = i;
    i = i + 1;
  });

  return resp.data;
};



const actualuzarMesDia = async (idmesdia, grupo) => {
  const resp = await clienteAxios.put(`/mesdia/actualizar/${idmesdia}/${grupo}`);
  return resp.data;
};


export { getAllMesDia, getAllMesDiaFiltrar, actualuzarMesDia };

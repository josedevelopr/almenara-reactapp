import clienteAxios from "../config/clienteAxios";

const getSchoolsAgreements = async () => {
  const resp = await clienteAxios.get("/schools-agreements");
  return resp.data;
};

export { getSchoolsAgreements };

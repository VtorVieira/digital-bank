import { verifyToken } from "../services/requests";
import { removeCPFCaracter } from "./clearCPF";


export const checkUserToken = async () => {
  const localToken = JSON.parse(localStorage.getItem('token')) || [];
  const logged = await verifyToken(localToken.token);
  const { cpf } = logged;
  const clearCPF = removeCPFCaracter(cpf);
  return clearCPF;
};

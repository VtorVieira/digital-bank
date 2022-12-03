import { verifyToken } from "../services/requests";

export const verifyUserLogged = async () => {
  const localToken = JSON.parse(localStorage.getItem('token')) || [];
  const logged = await verifyToken(localToken.token);
  return logged;
};

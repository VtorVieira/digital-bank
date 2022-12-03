export const removeCPFCaracter = (cpf) => {
  const clearCPF = cpf.replace(/\D/g, "");
  return clearCPF;
};

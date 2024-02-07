import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const readUserPerMonth = async () => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/user/UsuarioPorMes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar meus compras");
  }

  return (await res.json()) as Number[];
};

export const useReadUserPerMonth = (
  props?: UseQueryOptions<any, Error, Number[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readUserPerMonth"],
    queryFn: readUserPerMonth,
  });
};
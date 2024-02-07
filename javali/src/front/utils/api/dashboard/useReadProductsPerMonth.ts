import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const readProductsPerMonth = async () => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/hosting/hostingPorMes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar meus compras");
  }

  return (await res.json()) as Number[];
};

export const useReadProductsPerMonth = (
  props?: UseQueryOptions<any, Error, Number[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readProductsPerMonth"],
    queryFn: readProductsPerMonth,
  });
};
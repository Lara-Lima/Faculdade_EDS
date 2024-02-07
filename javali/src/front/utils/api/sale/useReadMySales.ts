import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Sale } from "@/utils/types/sale";

export const readMySales = async () => {
  const userId = localStorage.getItem("user");
  const res = await api(`/mySales/1`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar minhas vendas!");
  }

  const allSales = (await res.json()) as Sale;

 

  return allSales;
};

export const useReadMySales = (
  props?: UseQueryOptions<any, Error, Sale, string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readMySales"],
    queryFn: readMySales,
  });
};

import {
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api";
import { Buy, BuyResponse2 } from "@/utils/types/buy";

export const readMyBuys = async () => {
  const user = localStorage.getItem("user")?.replace(/['"]+/g, '');
  //TODO: COLOCAR O SOCIAL ID NO PARAMETRO
  const res = await api(`/api/purchase/myPurchase/${user}`);

  if (!res.ok) {
    throw new Error("Erro ao carregar minhas reservas!");
  }

  const allBuys = (await res.json()) as BuyResponse2[];



  return allBuys;
};

export const useReadMyBuys = (
  props?: UseQueryOptions<any, Error, BuyResponse2[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readMyBuys"],
    queryFn: readMyBuys,
  });
};

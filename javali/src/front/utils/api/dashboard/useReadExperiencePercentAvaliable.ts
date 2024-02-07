import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const readExperiencePercentAvaliable = async () => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/razaoCompraExperiencePorAvaliacao`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar meus compras");
  }

  return (await res.json()) as Number;
};

export const useReadExperiencePercentAvaliable = (
  props?: UseQueryOptions<any, Error, Number, string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readExperiencePercentAvaliable"],
    queryFn: readExperiencePercentAvaliable,
  });
};

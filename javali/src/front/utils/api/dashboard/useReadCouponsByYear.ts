import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const readCouponsByYear = async () => {
  const res = await api(`/api/purchase/cuponsByYear`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar cupons por ano");
  }

  return (await res.json()) as Number[];
};

export const useReadCouponsByYear = (
  props?: UseQueryOptions<any, Error, Number[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readCouponsByYear"],
    queryFn: readCouponsByYear,
  });
};

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";
import { Coupon, Coupons } from "@/utils/types/coupon";

export const readMyCoupon = async () => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/cupom/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar meus cupons!");
  }

  return (await res.json()) as Coupons[];
};

export const useReadMyCoupons = (
  props?: UseQueryOptions<any, Error, Coupon[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readMyCoupon"],
    queryFn: readMyCoupon,
  });
};

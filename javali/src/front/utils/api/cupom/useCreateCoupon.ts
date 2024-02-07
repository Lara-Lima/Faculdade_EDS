import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Coupon } from "@/utils/types/coupon";

//partial para atributos q podem ser nulos
export const createCoupon = async (coupon: Partial<Coupon>) => {
  const res = await api(`/api/cupom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...coupon,
      dataExpiracao: "2023-12-31",
      categoria: 1,
      disponivel: true,
      hostingId: null,
      userId: 1,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar cupom!");
  }

  return (await res.json()) as Coupon;
};

export const useCreateCoupon = (
  props?: UseMutationOptions<any, Error, Coupon, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createCoupon"],
    mutationFn: createCoupon,
  });
};

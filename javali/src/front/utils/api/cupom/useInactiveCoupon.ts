import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { useUser } from "@/components/context/UserContext";
import { Coupon } from "@/utils/types/coupon";

export const inactiveCoupon = async (id: number) => {
  const res = await api(`/api/cupom/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      disponivel: false,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer inativar coupon!");
  }

  return await res.json();
};

export const useInactiveCoupon = (
  props?: UseMutationOptions<any, Error, number, Coupon>
) => {
  return useMutation({
    ...props,
    mutationKey: ["inactiveCoupon"],
    mutationFn: inactiveCoupon,
    onSuccess: (data, ...rest) => {
      props?.onSuccess?.(data, ...rest);
    },
  });
};

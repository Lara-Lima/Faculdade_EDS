import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Coupon } from "@/utils/types/coupon";
import dayjs from "dayjs";

type CupomProps = {
  hostingId: number;
  coupon: Partial<Coupon>;
};

//partial para atributos q podem ser nulos
export const createHostingCoupon = async ({
  hostingId,
  coupon,
}: CupomProps) => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/cupom/create/${hostingId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...coupon,
      userId: userId,
      categoria: 1,
      disponivel: true,
      dataExpiracao: dayjs(coupon.dataExpiracao)
        .add(1, "month")
        .format("YYYY-MM-DD"),
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar cupom!");
  }

  return (await res.json()) as Coupon;
};

export const useCreateHostingCoupon = (
  props?: UseMutationOptions<any, Error, CupomProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createHostingCoupon"],
    mutationFn: createHostingCoupon,
  });
};

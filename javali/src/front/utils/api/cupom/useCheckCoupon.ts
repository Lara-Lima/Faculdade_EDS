import {
  UndefinedInitialDataOptions,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api";
import { Coupon, Coupons } from "@/utils/types/coupon";

export const checkCoupon = async (code: string) => {
  const userId = localStorage.getItem("userId");
  const res = await api(
    `/api/cupom/codigo/${code.toUpperCase()}/userId/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return undefined;
  }

  return (await res.json()) as Coupon;
};

export const useCheckCoupon = ({
  code,
  ...props
}: {
  code: string;
} & Partial<UseQueryOptions<undefined | Coupon, Error>>) => {
  return useQuery({
    ...props,
    queryKey: ["checkCoupon", code],
    queryFn: () => checkCoupon(code),
  });
};

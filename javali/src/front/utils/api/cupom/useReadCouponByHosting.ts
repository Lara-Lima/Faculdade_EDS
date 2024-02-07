import {
    UndefinedInitialDataOptions,
    UseQueryOptions,
    useQuery,
  } from "@tanstack/react-query";
  import { api } from "../api";
import { Coupon, Coupons } from "@/utils/types/coupon";
  
  export const readCouponByHosting = async (id: number) => {
    const userId = localStorage.getItem("userId");
    const res = await api(`/api/cupom/user/${userId}/hosting/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("Erro ao carregar minhas acomodações!");
    }
  
    return (await res.json()) as Coupon[];
  };
  
  export const useReadCouponByHosting = (
    {
      id,
      ...props
    }:{
      id: number;
    } & Partial<UseQueryOptions<
    Coupon[],
    Error,
    Coupon[],
    [string, number]
  >>
  
  ) => {
    return useQuery({
      ...props,
      queryKey: ["readCouponByHosting",id],
      queryFn: ()=>readCouponByHosting(id),
    });
  };
  
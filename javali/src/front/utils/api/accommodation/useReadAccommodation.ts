import {
  UndefinedInitialDataOptions,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api";
import { Accommodation } from "@/utils/types/accommodation";

export const readAccommodation = async (id: number) => {
  const userId = localStorage.getItem("user");
  const res = await api(`/api/hosting/hosting/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar minhas acomodações!");
  }

  return (await res.json()) as Accommodation;
};

export const useReadAccommodation = (
  {
    id,
    ...props
  }:{
    id: number;
  } & Partial<UseQueryOptions<
  Accommodation,
  Error,
  Accommodation,
  [string, number]
>>

) => {
  return useQuery({
    ...props,
    queryKey: ["readAccommodation",id],
    queryFn: ()=>readAccommodation(id),
  });
};

import {
  UndefinedInitialDataOptions,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api";
import { Accommodation } from "@/utils/types/accommodation";

export const readMyAccomodations = async () => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/hosting/byOwner/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar minhas acomodações!");
  }

  if (res.status === 204) {
    return [];
  }

  return (await res.json()) as Accommodation[];
};

export const useReadMyAccomodations = (
  props?: UseQueryOptions<any, Error, Accommodation[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readMyAccomodations"],
    queryFn: readMyAccomodations,
  });
};

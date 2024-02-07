import {
  UndefinedInitialDataOptions,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api";
import { Accommodation } from "@/utils/types/accommodation";

export const readExplorerAccomodations = async () => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/hosting/byDistinctOwner/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (!res.ok) {
    throw new Error("Erro ao carregar as acomodações!");
  }

  return (await res.json()) as Accommodation[];
};

export const useReadExplorerAccommodations = (
  props?: UseQueryOptions<any, Error, Accommodation[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readExplorerAccomodations"],
    queryFn: readExplorerAccomodations,
  });
};

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Accommodation } from "@/utils/types/accommodation";
import { api } from "../api";

type ReadAddressProps = {
  dateStart?: String | null;
  dateEnd?: String | null;
};

export const readExplorerAccomodationsByDays = async ({ dateStart, dateEnd }: ReadAddressProps): Promise<Accommodation[]> => {
  const userId = localStorage.getItem("userId");


  // Construir a URL com base nos parâmetros


  const url = `/api/hostingsdistinctUser?startDate=${dateStart}&endDate=${dateEnd}&userId=${userId}}`;

  const res = await api(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (!res.ok) {
    throw new Error("Erro ao carregar as acomodações!");
  }

  if (res.status === 204) {
    return [];
  }

  return (await res.json()) as Accommodation[];
};

export const useReadExplorerAccomodationsByDays = (
  dateStart?: String | null,
  dateEnd?: String | null,
  props?: UseQueryOptions<any, Error, Accommodation[], [string]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readExplorerAccomodationsByDays"],
    queryFn: () => readExplorerAccomodationsByDays({ dateStart, dateEnd }),
  });
};

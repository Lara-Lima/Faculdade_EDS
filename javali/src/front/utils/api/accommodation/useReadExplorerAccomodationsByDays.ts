import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Accommodation } from "@/utils/types/accommodation";
import { api } from "../api";
import queryString from "query-string";

type ReadAddressProps = {
  dateStart?: String | null;
  dateEnd?: String | null;
};

export const readExplorerAccomodationsByDays = async ({
  dateStart,
  dateEnd,
}: ReadAddressProps): Promise<Accommodation[]> => {
  const userId = localStorage.getItem("userId");

  // Construir a URL com base nos parâmetros

  const params = {
    ...(dateStart && { startDate: dateStart }),
    ...(dateEnd && { endDate: dateEnd }),
    userId: userId,
  };

  const url = `/api/hostingsdistinctUser?${queryString.stringify(params)}`;

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

type Args = {
  dateStart?: String | null;
  dateEnd?: String | null;
} & Partial<UseQueryOptions<any, Error, Accommodation[], [string]>>;
export const useReadExplorerAccomodationsByDays = ({
  dateStart = null,
  dateEnd = null,
  ...props
}: Args = {}) => {
  return useQuery({
    ...props,
    queryKey: ["readExplorerAccomodationsByDays"],
    queryFn: () => readExplorerAccomodationsByDays({ dateStart, dateEnd }),
  });
};

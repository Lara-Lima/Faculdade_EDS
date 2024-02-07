import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Experience } from "@/utils/types/experience";
import { api } from "../api";
import queryString from "query-string";

type ReadAddressProps = {
  date?: String | null;
};

export const readExperiencesByDate = async ({
  date,
}: ReadAddressProps): Promise<Experience[]> => {
  const userId = localStorage.getItem("userId");

  // Construir a URL com base nos parâmetros

  const params = {
    ...(date && { date }),
    userId: userId,
  };

  const url = `/api/experiencesDistinctUser?${queryString.stringify(params)}`;

  const res = await api(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar as experiencias!");
  }

  if (res.status === 204) {
    return [];
  }

  return (await res.json()) as Experience[];
};

type Args = {
  date?: String | null;
} & Partial<UseQueryOptions<any, Error, Experience[], [string]>>;
export const useReadExperiencesByDate = ({
  date = null,
  ...props
}: Args = {}) => {
  return useQuery({
    ...props,
    queryKey: ["readExperiencesByDate"],
    queryFn: () => readExperiencesByDate({ date }),
  });
};

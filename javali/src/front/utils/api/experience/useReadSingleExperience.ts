import {
  UndefinedInitialDataOptions,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";

export const readSingleExperience = async (id: number) => {
  const userId = localStorage.getItem("user");
  const res = await api(`/api/experience/experience/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar minhas acomodações!");
  }

  return (await res.json()) as Experience;
};

export const useReadSingleExperience = ({
  id,
  ...props
}: {
  id: number;
} & Partial<
  UseQueryOptions<Experience, Error, Experience, [string, number]>
>) => {
  return useQuery({
    ...props,
    queryKey: ["readSingleExperience", id],
    queryFn: () => readSingleExperience(id),
  });
};

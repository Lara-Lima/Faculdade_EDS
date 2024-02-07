import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";

export const readMyExperiences = async () => {
  const userId = localStorage.getItem("userId");

  const res = await api(`/api/experience/byOwner/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar minhas experiencias!");
  }

  if (res.status === 204) {
    return [];
  }

  return (await res.json()) as Experience[];
};

export const useReadMyExperiences = (
  props?: UseQueryOptions<any, Error, Experience[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readMyExperiences"],
    queryFn: readMyExperiences,
  });
};

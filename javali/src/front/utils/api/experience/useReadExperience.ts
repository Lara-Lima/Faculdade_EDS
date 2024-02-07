import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";

export const readExperience = async () => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/experience/byDistinctOwner/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

 
  if (!res.ok) {
    throw new Error("Erro ao carregar as acomodações!");
  }

  return (await res.json()) as Experience[];
};

export const useReadExperiences = (
  props?: UseQueryOptions<any, Error, Experience[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readExperience"],
    queryFn: readExperience,
  });
};

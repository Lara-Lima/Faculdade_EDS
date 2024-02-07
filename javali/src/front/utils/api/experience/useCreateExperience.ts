import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";

//partial para atributos q podem ser nulos
export const createExperience = async (experience: Partial<Experience>) => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/experience/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...experience,
      userId: userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar experiencia!");
  }

  return (await res.json()) as Experience;
};

export const useCreateExperience = (
  props?: UseMutationOptions<any, Error, Experience, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createExperience"],
    mutationFn: createExperience,
  });
};

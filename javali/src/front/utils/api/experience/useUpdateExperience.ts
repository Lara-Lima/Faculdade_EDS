import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";

type UpdateExperienceProps = {
  id: number;
  experience: Partial<Experience>;
};
export const updateExperience = async ({
  id,
  experience,

}: UpdateExperienceProps) => {
  delete experience.experienceId;
  const userId = localStorage.getItem("userId");

  const res = await api(`/api/experience/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...experience,
      userId: userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar a experiencia!");
  }

  return (await res.json()) as Experience;
};

export const useUpdateExperience = (
  props?: UseMutationOptions<any, Error, UpdateExperienceProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updateExperience"],
    mutationFn: updateExperience,
  });
};

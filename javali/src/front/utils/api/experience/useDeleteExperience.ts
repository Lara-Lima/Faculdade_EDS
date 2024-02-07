import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";

export const deleteExperience = async (id: number) => {
  const res = await api(`/api/experience/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar hospedagem!");
  }
  if(res.status === 204) {
    return { id };
  }

  return (await res.json()) as Experience;
};

export const useDeleteExperience = (
  props?: UseMutationOptions<any, Error, number, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["deleteExperience"],
    mutationFn: deleteExperience,
  });
};

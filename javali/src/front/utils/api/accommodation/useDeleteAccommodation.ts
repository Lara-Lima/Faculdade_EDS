import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Accommodation } from "@/utils/types/accommodation";

export const deleteAccommodation = async (id: number) => {
  const res = await api(`/api/hosting/${id}`, {
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

  return (await res.json()) as Accommodation;
};

export const useDeleteAccommodation = (
  props?: UseMutationOptions<any, Error, number, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["deleteAccommodation"],
    mutationFn: deleteAccommodation,
  });
};

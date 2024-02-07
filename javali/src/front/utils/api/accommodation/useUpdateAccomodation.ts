import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Accommodation } from "@/utils/types/accommodation";

type UpdateAccommodationProps = {
  id: number;
  accommodation: Partial<Accommodation>;
};
export const updateAccommodation = async ({
  id,
  accommodation,
}: UpdateAccommodationProps) => {
  delete accommodation.hostingId;
  const userId = localStorage.getItem("userId");

  const res = await api(`/api/hosting/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...accommodation,
      userId: userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar o usuário!");
  }

  return (await res.json()) as Accommodation;
};

export const useUpdateAccommodation = (
  props?: UseMutationOptions<any, Error, UpdateAccommodationProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updateAccommodation"],
    mutationFn: updateAccommodation,
  });
};

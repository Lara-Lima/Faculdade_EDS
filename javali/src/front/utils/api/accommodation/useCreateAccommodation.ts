import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Accommodation } from "@/utils/types/accommodation";

export const createAccommodation = async (
  accommodation: Partial<Accommodation>
) => {
  const userId = localStorage.getItem("userId");
  const res = await api(`/api/hosting/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...accommodation,
      userId: userId,
      // checkIn: checkIn.toString(),
      // checkOut: checkOut.toString(),
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar acomodação!");
  }

  return (await res.json()) as Accommodation;
};

export const useCreateAccommodation = (
  props?: UseMutationOptions<any, Error, Accommodation, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createAccommodation"],
    mutationFn: createAccommodation,
  });
};

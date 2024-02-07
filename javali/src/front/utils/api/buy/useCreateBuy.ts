import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Buy } from "@/utils/types/buy";
import { Experience } from "@/utils/types/experience";
import { Accommodation } from "@/utils/types/accommodation";
import { v4 as uuidv4 } from "uuid";
import { Sale } from "@/utils/types/sale";
import { Coupon } from "@/utils/types/coupon";
import {
  ExperienceDate,
  AccommodationDateStartAndDateEnd,
} from "@/components/context/CartContext";
type CreateBuyArgs = {
  experience?: ExperienceDate[];
  accommodation?: AccommodationDateStartAndDateEnd[];
  cupom?: Coupon;
};
export const createBuy = async ({
  experience,
  accommodation,
  cupom,
}: CreateBuyArgs) => {
  const userId = localStorage.getItem("userId");

  const res = await api(`/api/purchase/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buyer: userId,
      cupomId: cupom?.cupomId,
      purchaseHostings:
        accommodation?.map(({ accommodation, dateEnd, dateStart }) => ({
          hostingId: accommodation.hostingId,
          dateStart: dateStart,
          dateEnd: dateEnd,
        })) || [],
      purchaseExperiences:
        experience?.map(({ experience, date }) => ({
          experienceId: experience.experienceId,
          date: date,
        })) || [],
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar compra!");
  }

  return (await res.json()) as Buy;
};

export const useCreateBuy = (
  props?: UseMutationOptions<any, Error, CreateBuyArgs, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createBuy"],
    mutationFn: createBuy,
  });
};

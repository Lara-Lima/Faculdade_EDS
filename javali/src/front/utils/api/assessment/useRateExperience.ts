import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Experience } from "@/utils/types/experience";
import { Assessment2 } from "@/utils/types/assessment";

type RateExperienceProps = {
  experienceId: number;
  assessment: Assessment2;
};

export const rateExperience = async ({
  experienceId,
  assessment,
}: RateExperienceProps) => {
  const res = await api(`/api/assessmentExperience/create/${experienceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assessment),
  });

  if (!res.ok) {
    throw new Error("Erro ao avaliar!");
  }

  return (await res.json()) as Experience;
};

export const useRateExperience = (
  props?: UseMutationOptions<any, Error, RateExperienceProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["rateExperience"],
    mutationFn: rateExperience,
  });
};

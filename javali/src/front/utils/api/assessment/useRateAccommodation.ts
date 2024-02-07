import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Accommodation,  } from "@/utils/types/accommodation";
import { Assessment2 } from "@/utils/types/assessment";

type AvaliarHospedagemProps = {
  hostingId: number;
  assessment: Assessment2;
};

///api/assessmentHosting/create/{hostingId}
//api/assessmentExperience/create/1

//{
//   "titleAssessment": "otima fff",
//   "descriptionAssessment": "A hospedagem foi maravilhosa, recomendo a todos!",
//   "scoreAssessment": 5.5
// }

export const rateAccommodation = async ({
  hostingId,
  assessment,
}: AvaliarHospedagemProps) => {
  const hospedagemResponse = await api(`/api/assessmentHosting/create/${hostingId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assessment),
  });

  if (!hospedagemResponse.ok) {
    throw new Error("Erro ao avaliar!");
  }

  return (await hospedagemResponse.json()) as Accommodation;
};

export const useRateAccommodation = (
  props?: UseMutationOptions<any, Error, AvaliarHospedagemProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["rateAccommodation"],
    mutationFn: rateAccommodation,
  });
};

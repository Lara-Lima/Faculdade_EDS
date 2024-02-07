"use client";

import React, { FC } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Assessment as AssessmentType } from "@/utils/types/accommodation";

type AssessmentProps = {
  avaliacoes: AssessmentType[];
};

export const Assessment: FC<AssessmentProps> = ({ avaliacoes }) => {
  const calcularMediaAvaliacoes = () => {
    const media =
      avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0) /
      avaliacoes.length;

    return media;
  };

  return (
    <Box>
      {avaliacoes?.length > 0 ? (
        <Rating
          name="text-feedback"
          value={calcularMediaAvaliacoes()}
          readOnly
          precision={0.5}
        />
      ) : (
        <Box>Sem Avaliação</Box>
      )}
    </Box>
  );
};

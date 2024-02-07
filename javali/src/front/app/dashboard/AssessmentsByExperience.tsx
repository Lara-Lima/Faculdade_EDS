import { useReadExperiencePercentAvaliable } from "@/utils/api/dashboard/useReadExperiencePercentAvaliable";
import { Box } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Avaliado", 11],
  ["Não avaliado", 2],
];

export const options = {
  title: "Avaliação Experiência",
};

export function AssessmentsByExperience() {
  const { data } = useReadExperiencePercentAvaliable();

  // Assuming data is a Number object, extract the numeric value
  const numericData = data?.valueOf() || 0;

  const avaliado = numericData ? numericData * 100 : 0;
  const naoAvaliado = avaliado > -1 ? 100 - avaliado : 0;

  const d = [
    ["Task", "Hours per Day"],
    ["Avaliado", avaliado],
    ["Não avaliado", naoAvaliado],
  ];

  return (
    <Box
      sx={{
        padding: "16px",
        gap: "16px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
      }}
    >
      <Chart
        chartType="PieChart"
        data={d}
        options={options}
        width={"100%"}
        height={"200px"}
      />
    </Box>
  );
}

import { useReadExperiencePerMonth } from "@/utils/api/dashboard/useReadExperiencePerMonth";
import { useReadProductsPerMonth } from "@/utils/api/dashboard/useReadProductsPerMonth";
import { Box } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["mês", "Hospedagem", "Experiência"],
  ["janeiro", 1000, 400],
  ["feveiro", 1170, 460],
  ["março", 660, 1120],
  ["abril", 1030, 540],
  ["maio", 1030, 540],
  ["junho", 1030, 540],
  ["julho", 1030, 540],
  ["agosto", 1030, 540],
  ["setembro", 1030, 540],
  ["outubro", 1030, 540],
  ["novembro", 1030, 540],
  ["dezembro", 1030, 540],
];

export const options = {
  chart: {
    title: "Cadastro de Hospedagem e Experiencia por Mês",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

export const RegisterProduct = () => {
  const { data } = useReadProductsPerMonth();

  const { data: dataExperience } = useReadExperiencePerMonth();

  const s = data
    ? [
        ["month", "compras"],
        ...[
          "janeiro",
          "fevereiro",
          "março",
          "abril",
          "maio",
          "junho",
          "julho",
          "agosto",
          "setembro",
          "outubro",
          "novembro",
          "dezembro",
        ].map((mes, index) => [mes, data[index] || 0]),
      ]
    : [];

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const responseHospedagem = [1, 1, 0, 0, 0, 0, 0, 0, 1, 3, 2, 2];
  const responseExperience = [1, 1, 0, 0, 0, 7, 6, 0, 1, 3, 2, 2];

  const resultado = meses.map((mes, index) => {
    return [
      mes,
      data && data[index] ? data[index].toString() : "0",
      dataExperience && dataExperience[index]
        ? dataExperience[index].toString()
        : "0",
    ];
  });

  // Adicionando os cabeçalhos
  resultado.unshift(["mes", "hospedagens", "experiencias"]);

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
        chartType="Bar"
        width="100%"
        height="400px"
        data={resultado}
        options={options}
      />
    </Box>
  );
};

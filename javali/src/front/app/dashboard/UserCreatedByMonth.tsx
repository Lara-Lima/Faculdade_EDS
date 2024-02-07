import { useReadUserPerMonth } from "@/utils/api/dashboard/useReadUserPerMonth";
import { Box } from "@mui/material";
import React from "react";
import { Chart } from "react-google-charts";

export const options = {
  chart: {
    title: "Usuários por mês",
    subtitle: "usuários cadastrados por mês",
  },
};

export function UserByInactive() {
  const { data } = useReadUserPerMonth();
  const s = data
    ? [
        ["mes", "usuarios"],
        ...[
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ].map((mes, index) => [mes, data[index]] || 0),
      ]
    : [];
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
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={s}
        options={options}
      />
    </Box>
  );
}

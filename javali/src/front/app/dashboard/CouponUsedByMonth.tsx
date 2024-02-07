// CouponUsedByMonth.tsx

import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Chart } from "react-google-charts";
import { useReadCouponsByYear } from "@/utils/api/dashboard/useReadCouponsByYear";

export const options = {
  title: "Cupom",
  is3D: true,
  minValue: 0,
  vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
  hAxis: { title: "Month" },
  chart: {
    title: "Cupons utilizados por mês",
    subtitle: "Cupons utilizados por mês",
  },
};

export const CouponUsedByMonth: FC = () => {
  const [monthlyData, setMonthlyData] = useState<number[]>([]);

  const { data } = useReadCouponsByYear();

  const columns = data
    ? [
        ["mês", "qtd"],
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

  const cupons = data
    ? [
        ["Mes", "Quantidade"],
        ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthNumber, index) => [
          monthNumber,
          data[index] || 0,
        ]),
      ]
    : [];

  return (
    <Box
      sx={{
        padding: "16px",
        gap: "16px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "8px",
        height: "100%",
      }}
    >
      <Chart
        chartType="Bar"
        options={options}
        data={columns}
        width={"100%"}
        height={"100%"}
      />
    </Box>
  );
};

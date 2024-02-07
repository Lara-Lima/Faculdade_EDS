"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { useUser } from "@/components/context/UserContext";
import Navbar from "@/components/Navbar";
import { Chart } from "react-google-charts";
import { useReadBuysByYear } from "@/utils/api/dashboard/useReadBuysByYear";

export const options = {
  title: "Compras",
  curveType: "function",
  legend: { position: "bottom" },
};

export default function BuyByMonth() {
  type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
  };

  const { data } = useReadBuysByYear();

  const s = data
    ? [
        ["mes", "compras"],
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

  const [value, setValue] = useState(0);

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
        chartType="Line"
        width="100%"
        height="100%"
        data={s}
        options={options}
      />
    </Box>
  );
}

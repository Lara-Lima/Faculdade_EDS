"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "@/components/context/UserContext";
import Navbar from "@/components/Navbar";
import { Chart } from "react-google-charts";
import BuyByMonth from "./buyByMonth";
import { RegisterProduct } from "./RegisterProduct";
import { UserByInactive } from "./UserCreatedByMonth";
import { CouponUsedByMonth } from "./CouponUsedByMonth";
import { AssessmentsByHosting } from "./AssessmentsByHosting";
import { AssessmentsByExperience } from "./AssessmentsByExperience";
import InfoIcon from "@mui/icons-material/Info";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2008", 1030, 540],
  ["2009", 1000, 400],
  ["2010", 1170, 460],
  ["2011", 660, 1120],
  ["2012", 1030, 540],
];

export const options = {
  title: "Compras",
  curveType: "function",
  legend: { position: "bottom" },
};

export default function Dashboard() {
  type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
  };

  const { user } = useUser();

  const [value, setValue] = useState(0);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs value={0} aria-label="basic tabs example">
          <Tab label="Dashboard" />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: "24px",
          padding: "48px",
        }}
      >
        <Typography>
          <InfoIcon /> Os valores exibidos nos gráficos abaixo correspondem aos
          últimos 12 meses, considerando o mês atual como ponto de partida.
        </Typography>
        <UserByInactive></UserByInactive>

        <RegisterProduct></RegisterProduct>

        <BuyByMonth></BuyByMonth>

        <Box
          sx={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 2fr" }}
        >
          <Box
            sx={{
              display: "grid",
              gap: "16px",
            }}
          >
            <AssessmentsByHosting></AssessmentsByHosting>
            <AssessmentsByExperience></AssessmentsByExperience>
          </Box>
          <Box>
            <CouponUsedByMonth></CouponUsedByMonth>
          </Box>
        </Box>
      </Box>
    </>
  );
}

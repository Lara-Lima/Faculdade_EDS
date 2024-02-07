"use client";
import Navbar from "@/components/Navbar";
import { useUser } from "@/components/context/UserContext";
import { Box, Button, ButtonGroup, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ExplorerHosting from "./ExplorerHosting";
import { Coupons } from "../coupons/page";
import { ExplorerExperience } from "./ExplorerExperience";
import HistoryBuy from "../history/HistoryBuy";
import { parseAsString, useQueryStates } from "next-usequerystate";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Products() {
  const [, setDates] = useQueryStates({
    dateStart: parseAsString,
    dateEnd: parseAsString,
  });
  const { user } = useUser();

  const [value, setValue] = useState(0);

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    await setDates({ dateStart: null, dateEnd: null });
    setValue(newValue);
  };

  return (
    <div className="">
      <Navbar />

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Hospedagens de tirar o folêgo" {...a11yProps(0)} />
          <Tab label="Experiências Incríveis" {...a11yProps(1)} />
          <Tab label="Meus Cupons" {...a11yProps(2)} />
          <Tab label="Minhas Reservas" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <ExplorerHosting />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ExplorerExperience />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <Coupons />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <HistoryBuy />
      </CustomTabPanel>
    </div>
  );
}

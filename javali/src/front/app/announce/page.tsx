"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useUser } from "@/components/context/UserContext";
import Navbar from "@/components/Navbar";
import AnnounceHosting from "./hosting/AnnounceHosting";
import MyHostings from "./hosting/MyHostings";
import AnnounceExperience from "./experience/AnnounceExperience";
import MyExperiences from "./experience/MyExperiences";

export default function Annouce() {
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

  const { user } = useUser();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Anunciar Hospedagens" {...a11yProps(0)} />
          <Tab label="Anunciar Experiencias" {...a11yProps(1)} />
          <Tab label="Minhas Hospedagens" {...a11yProps(2)} />
          <Tab label="Minhas Experiencias" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <AnnounceHosting onCreate={() => handleChange(null as any, 2)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AnnounceExperience onCreate={() => handleChange(null as any, 3)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MyHostings />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <MyExperiences />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={4}>
        <HistorySale />
      </CustomTabPanel> */}
    </>
  );
}

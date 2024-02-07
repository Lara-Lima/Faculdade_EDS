"use client";
import Navbar from "@/components/Navbar";
import { useUser } from "@/components/context/UserContext";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ExplorerHosting from "../explorer/ExplorerHosting";
import { Coupons } from "../coupons/page";
import HistoryBuy from "../history/HistoryBuy";

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
  const { user } = useUser();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <div className=""></div>;
}

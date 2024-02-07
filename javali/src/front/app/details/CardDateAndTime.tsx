import Typography from "@mui/material/Typography";
import { Autocomplete, Box, Button, TextField } from "@mui/material";

import { Experience } from "@/utils/types/experience";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FC, useState } from "react";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useQueryState } from "next-usequerystate";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useCart } from "@/components/context/CartContext";

type CardDateAndTimeProps = {
  unavailableDateRange: Dayjs[];
  experience: Experience;
};

export const CardDateAndTime: FC<CardDateAndTimeProps> = ({
  unavailableDateRange,
  experience,
}) => {
  const { addExperience } = useCart();
  const unavailableDateRangeSorted = unavailableDateRange.sort((a, b) =>
    a.isBefore(b) ? 1 : -1
  );
  const firstUnavailableDate = unavailableDateRangeSorted.slice(-1)[0];
  const lastUnavailableDate = unavailableDateRangeSorted[0];
  const [date, setDate] = useQueryState("dateStart");
  const [, setExperienceSelected] = useQueryState("experience");
  const [error, setError] = useState("");

  const handleCheckInChange = (newValue: Dayjs | null) => {
    setError("");
    if (newValue) {
      setDate(newValue.format("YYYY-MM-DD"));
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        className={"bg-gray-50"}
        sx={{
          display: "flex",
          gap: "16px",
          padding: "16px 48px 24px 48px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Data"
              value={dayjs(date)}
              onChange={handleCheckInChange}
              format="DD/MM/YYYY"
              shouldDisableDate={(date) =>
                unavailableDateRange.filter((unavailableDate) =>
                  date.isSame(unavailableDate, "day")
                ).length > 0
              }
            />
          </DemoContainer>
          {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )}
        </LocalizationProvider>

        <Button
          sx={{ marginTop: "8px" }}
          variant="contained"
          disabled={!date}
          onClick={() => {
            if (!date) {
              setError("Selecione uma data");
              return;
            }
            addExperience({
              experience,
              date,
            });
            setExperienceSelected(null);
            setDate(null);
          }}
        >
          Adicionar ao carrinho
          <ShoppingCartIcon />
        </Button>
      </Box>
    </Box>
  );
};

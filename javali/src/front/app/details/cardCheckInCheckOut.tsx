import Typography from "@mui/material/Typography";
import { Autocomplete, Box, Button, TextField } from "@mui/material";

import { Accommodation } from "@/utils/types/accommodation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FC, useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useQueryState } from "next-usequerystate";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useCart } from "@/components/context/CartContext";

type CardCheckInCheckOutProps = {
  unavailableDateRange: Dayjs[];
  accommodation: Accommodation;
};

export const CardCheckInCheckOut: FC<CardCheckInCheckOutProps> = ({
  unavailableDateRange,
  accommodation,
}) => {
  const { addAccommodation } = useCart();
  const unavailableDateRangeSorted = unavailableDateRange.sort((a, b) =>
    a.isBefore(b) ? 1 : -1
  );
  const firstUnavailableDate = unavailableDateRangeSorted.slice(-1)[0];
  const lastUnavailableDate = unavailableDateRangeSorted[0];

  const [dateStart, setDateStart] = useQueryState("dateStart");
  const [dateEnd, setDateEnd] = useQueryState("dateEnd");
  const [, setAccommodationSelected] = useQueryState("accommodation");
  const [error, setError] = useState("");

  const handleCheckInChange = (newValue: Dayjs | null) => {
    setError("");
    if (newValue) {
      setDateStart(newValue.format("YYYY-MM-DD"));
    }
  };

  const handleCheckOutChange = (newValue: Dayjs | null) => {
    setError("");
    if (newValue) {
      setDateEnd(newValue.format("YYYY-MM-DD"));
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
              label="Data da check-in"
              value={dateStart ? dayjs(dateStart) : null}
              onChange={handleCheckInChange}
              format="DD/MM/YYYY"
              shouldDisableDate={(date) =>
                unavailableDateRange.filter((unavailableDate) =>
                  date.isSame(unavailableDate, "day")
                ).length > 0 || date.isBefore(dayjs(), "day")
              }
            />
            <DatePicker
              label="Data do check-out"
              value={dateEnd ? dayjs(dateEnd) : null}
              onChange={handleCheckOutChange}
              format="DD/MM/YYYY"
              disabled={!dateStart}
              shouldDisableDate={(date) =>
                unavailableDateRange.filter((unavailableDate) =>
                  date.isSame(unavailableDate, "day")
                ).length > 0 ||
                date.isBefore(dayjs(dateStart), "day") ||
                (firstUnavailableDate &&
                  dayjs(dateStart).isBefore(firstUnavailableDate) &&
                  date.isAfter(dayjs(firstUnavailableDate), "day"))
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
          disabled={!dateStart || !dateEnd}
          onClick={() => {
            if (!dateStart || !dateEnd) {
              setError("Selecione as datas de check-in e check-out");
              return;
            }
            addAccommodation({
              accommodation,
              dateEnd,
              dateStart,
            });
            setAccommodationSelected(null);
            setDateStart(null);
            setDateEnd(null);
          }}
        >
          Adicionar ao carrinho
          <ShoppingCartIcon />
        </Button>
      </Box>
    </Box>
  );
};

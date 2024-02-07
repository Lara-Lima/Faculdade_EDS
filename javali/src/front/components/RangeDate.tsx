import React, { useState, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useQueryState } from "next-usequerystate";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

type RangeDateProps = {
  onSearch: (dateStart: string, dateEnd: string) => void;
  onClean?: () => void;
  dateStartOnly?: boolean;
};
export default function RangeDate({
  onSearch,
  dateStartOnly,
  onClean,
}: RangeDateProps) {
  const [dateStart, setDateStart] = useQueryState("dateStart");
  const [dateEnd, setDateEnd] = useQueryState("dateEnd");

  // Valor padrão é o dia de hoje
  const [error, setError] = useState("");

  const handleCheckInChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDateStart(newValue.format("YYYY-MM-DD"));
    }
    setError("");
  };

  const handleCheckOutChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDateEnd(newValue.format("YYYY-MM-DD"));
    }
    setError("");
  };

  const resetValues = useCallback(async () => {
    await setDateStart(null);
    await setDateEnd(null);
    onClean?.();
  }, [setDateStart, setDateEnd, onClean]);

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
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[]}
          sx={{ width: 300, paddingTop: "8px" }}
          renderInput={(params) => <TextField {...params} label="Onde?" />}
        />

        <TextField
          sx={{ width: 300, marginTop: "8px" }}
          id="hospede-basic"
          label="Hospedes?"
          variant="outlined"
          type="number"
        /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label={dateStartOnly ? "Data" : "Data do check-in"}
              onChange={handleCheckInChange}
              format="DD/MM/YYYY"
              value={dateStart ? dayjs(dateStart) : null}
              shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
            />
            {!dateStartOnly && (
              <DatePicker
                label="Data do check-out"
                onChange={handleCheckOutChange}
                format="DD/MM/YYYY"
                disabled={!dateStart}
                value={dateEnd ? dayjs(dateEnd) : null}
                shouldDisableDate={(date) =>
                  date.isBefore(dayjs(), "day") ||
                  date.isBefore(dayjs(dateStart), "day")
                }
              />
            )}
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
          disabled={(!dateStart || !dateEnd) && (!dateStartOnly || !dateStart)}
          onClick={() => {
            if (dateStartOnly) {
              if (dateStart) {
                onSearch(dateStart, dateStart);
              } else {
                setError("Selecione a data");
              }
            } else if (dateStart && dateEnd) {
              onSearch(dateStart, dateEnd);
            } else {
              setError("Selecione as datas");
            }
          }}
        >
          Buscar
        </Button>

        <Button
          disabled={(!dateStart || !dateEnd) && (!dateStartOnly || !dateStart)}
          sx={{ marginTop: "8px" }}
          variant="outlined"
          color="secondary"
          onClick={resetValues}
        >
          Limpar
        </Button>
      </Box>
    </Box>
  );
}

"use client";
import { useMemo } from "react";
import { Box, Dialog } from "@mui/material";
import { DetailsAccommodationSelected } from "../details/DetailsAccommodationSelected";
import { useQueryState } from "next-usequerystate";
import { useReadAccommodation } from "@/utils/api/accommodation/useReadAccommodation";
import { useReadUnavailableDatesByHosting } from "@/utils/api/accommodation/useReadUnavailableDatesByHosting";
import dayjs from "dayjs";

export default function ModalDetailsAccomodation({ tabKey = "accommodation" }) {
  const [accommodationSelected, setAccommodationSelected] =
    useQueryState(tabKey);

  const { data, isLoading } = useReadAccommodation({
    id: Number(accommodationSelected),
    enabled: Boolean(accommodationSelected),
  });
  const { data: unavailableDateRange } = useReadUnavailableDatesByHosting({
    hostingId: Number(accommodationSelected),
    enabled: Boolean(accommodationSelected),
  });

  return (
    <Dialog
      fullWidth
      maxWidth={"xl"}
      open={Boolean(accommodationSelected)}
      onClose={() => {
        setAccommodationSelected(null);
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          padding: "24px",
        }}
      >
        {isLoading && <div>Carregando...</div>}
        {data && (
          <DetailsAccommodationSelected
            unavailableDateRange={
              unavailableDateRange?.map((date) => dayjs(date)) || []
            }
            accommodation={data}
          />
        )}
      </Box>
    </Dialog>
  );
}

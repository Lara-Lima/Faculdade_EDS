"use client";
import { useMemo } from "react";
import { Box, Dialog } from "@mui/material";
import { DetailsExperienceSelected } from "../details/DetailsExperienceSelected";
import { useQueryState } from "next-usequerystate";
import { useReadSingleExperience } from "@/utils/api/experience/useReadSingleExperience";
import { useReadUnavailableDatesByHosting } from "@/utils/api/accommodation/useReadUnavailableDatesByHosting";
import dayjs from "dayjs";

export function ModalDetailsExperience({ tabKey = "experience" }) {
  const [accommodationSelected, setAccommodationSelected] =
    useQueryState(tabKey);

  const { data, isLoading } = useReadSingleExperience({
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
          <DetailsExperienceSelected
            unavailableDateRange={
              unavailableDateRange?.map((date) => dayjs(date)) || []
            }
            experience={data}
          />
        )}
      </Box>
    </Dialog>
  );
}

import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Rating,
  TextField,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { Experience } from "@/utils/types/experience";
import { FC, useState } from "react";
import {
  AirlineSeatLegroomNormal,
  Bed,
  Crop,
  Groups,
} from "@mui/icons-material";
import Image from "next/image";
import { CardCheckInCheckOut } from "./cardCheckInCheckOut";
import { Dayjs } from "dayjs";
import { CardDateAndTime } from "./CardDateAndTime";

type DetailsExperienceSelected = {
  experience: Experience;
  unavailableDateRange: Dayjs[];
};

export const DetailsExperienceSelected: FC<DetailsExperienceSelected> = ({
  experience,
  unavailableDateRange,
}) => {
  return (
    <Box>
      <CardDateAndTime
        experience={experience}
        unavailableDateRange={unavailableDateRange}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 1fr",
          margin: "16px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: "16px",
            maxHeight: "62vh",
            overflow: "auto",
          }}
        >
          {experience?.images?.map((image, key) => (
            <img
              key={image.imageId}
              src={image.url}
              alt="Descrição da imagem"
              width={400}
              height={400}
            />
          ))}
        </Box>
        <Box sx={{ padding: "24px", display: "grid", gap: "24px" }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h2">{experience.title}</Typography>

              <Rating value={10} readOnly precision={1} size="small" />
            </Box>

            <Typography variant="h5">
              <LocationOnOutlinedIcon />
              {`${experience.address?.city} + ${experience.address?.countryState}`}
            </Typography>
          </Box>
          <Typography variant="caption">{experience.description}</Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              gridColumn: "3",
              gridRow: "3",
            }}
            variant="h4"
            margin={"24px 24px"}
          >
            Avaliações
          </Typography>

          <Box sx={{ display: "grid", gap: "16px" }}>
            {experience.assessments?.map((assessment, key) => (
              <Box
                key={key}
                sx={{
                  display: "grid",
                  padding: "8px",
                  borderRadius: "16px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h6">
                    {assessment.userAssessment}
                  </Typography>
                  <Rating
                    value={assessment.scoreAssessment}
                    readOnly
                    precision={1}
                    size="small"
                  />
                </Box>
                {assessment.descriptionAssessment && (
                  <Typography variant="caption">
                    {assessment.descriptionAssessment}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

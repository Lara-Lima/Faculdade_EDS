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

import { Accommodation } from "@/utils/types/accommodation";
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

type DetailsAccommodationSelectedProps = {
  accommodation: Accommodation;
  unavailableDateRange: Dayjs[];
};

export const DetailsAccommodationSelected: FC<
  DetailsAccommodationSelectedProps
> = ({ accommodation, unavailableDateRange }) => {
  const [open, setOpen] = useState(false);
  const [cupomData, setCupomData] = useState({
    cupomId: "",
    userId: null,
    titulo: "",
    disponivel: false,
    dataExpiracao: "",
    hostingId: null,
    categoria: "",
    desconto: 0.0,
  });

  return (
    <Box>
      <CardCheckInCheckOut
        unavailableDateRange={unavailableDateRange}
        accommodation={accommodation}
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
          {accommodation?.images?.map((image, key) => (
            <Box key={image.imageId}>
              <img
                src={image.url}
                alt="Descrição da imagem"
                width={400}
                height={400}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ padding: "24px", display: "grid", gap: "24px" }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h2">{accommodation.title}</Typography>

              <Rating value={10} readOnly precision={1} size="small" />
            </Box>

            <Typography variant="h5">
              <LocationOnOutlinedIcon />
              {`${accommodation.address?.city} + ${accommodation.address?.countryState}`}
            </Typography>
          </Box>
          <Typography variant="caption">{accommodation.description}</Typography>

          <Box sx={{ display: "flex", gap: "36px" }}>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Crop />{" "}
              <Typography variant="h6">
                {accommodation.hostingArea} m²
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Groups />
              <Typography variant="h6">
                Suporta {accommodation.maxCapacity} pessoas
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Bed />{" "}
              <Typography variant="h6">
                {accommodation.roomsQuantity} quartos
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <AirlineSeatLegroomNormal />{" "}
              <Typography variant="h6">
                {accommodation.bathroomsQuantity > 1
                  ? `${accommodation.bathroomsQuantity} banheiro`
                  : `${accommodation.bathroomsQuantity} banheiros`}
              </Typography>
            </Box>
          </Box>
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

          <Box
            sx={{
              display: "grid",
              gap: "16px",
              overflowY: "auto",
              maxHeight: "260px",
            }}
          >
            {accommodation.assessments?.map((assessment, key) => (
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
                  <Typography variant="h6">{assessment.userId}</Typography>
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

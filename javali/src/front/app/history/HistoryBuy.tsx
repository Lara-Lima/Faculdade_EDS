import * as React from "react";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Rating,
} from "@mui/material";
import ModalAssessments from "./ModalAssessments";
import { useReadMyBuys } from "@/utils/api/buy/useReadMyBuys";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import {
  useQueryStates,
  parseAsString,
  parseAsStringEnum,
} from "next-usequerystate";
import { RatingType } from "./ModalAssessments";
import { useUser } from "@/components/context/UserContext";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PartyModeIcon from "@mui/icons-material/PartyMode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CircularProgress from "@mui/material/CircularProgress";
import { BuyResponse2 } from "@/utils/types/buy";

export default function HistoryBuy() {
  const { userIdStorage } = useUser();
  const { data: dataMyBuys, isLoading } = useReadMyBuys();
  const [openData, setOpenData] = useQueryStates({
    id: parseAsString,
    ratingType: parseAsStringEnum<RatingType>(Object.values(RatingType)),
  });

  const handleAvaliar = (id: string, ratingType: RatingType) => {
    setOpenData({ id, ratingType });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "66vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          opacity: 0.35,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!dataMyBuys) {
    return (
      <Box
        sx={{
          height: "66vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          opacity: 0.35,
        }}
      >
        <CalendarMonthIcon sx={{ fontSize: "120px" }} />
        <Typography>Não há Reservas!</Typography>
      </Box>
    );
  }

  if (dataMyBuys.length === 0) {
    return (
      <Box
        sx={{
          height: "66vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          opacity: 0.35,
        }}
      >
        <CalendarMonthIcon sx={{ fontSize: "120px" }} />
        <Typography>Não há Reservas!</Typography>
      </Box>
    );
  }

  const titulodaReserva = (buy: BuyResponse2) => {
    return `Compra realizada em${" "}
  ${dayjs(buy.datePurchase).format("DD/MM/YYYY")} no valor de ${" "}
  ${
    buy.cupons?.length == 0
      ? Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(buy.price)
      : Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(buy.price - (buy.cupons[0].desconto * buy.price) / 100)
  }`;
  };

  return (
    <>
      <Box
        sx={{
          padding: "16px 24px",
          backgroundColor: "#F5F5F5",
          height: "84vh",
        }}
      >
        Minhas Reservas
        {dataMyBuys
          .slice()
          .reverse()
          .map((buy) => (
            <Accordion key={buy.purchaseId}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{titulodaReserva(buy)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {buy.purchaseHostings.length > 0 && (
                  <Box>
                    <Typography>
                      <HomeWorkIcon /> Hospedage
                      {buy.purchaseHostings.length > 1 ? "ns" : "m"}:{" "}
                    </Typography>
                    {buy.purchaseHostings.map((hosting) => {
                      const hasMyRating = hosting.hosting.assessments?.find(
                        (assessment) => assessment.userId === userIdStorage
                      );
                      return (
                        <Box key={hosting.hosting.hostingId}>
                          <Typography>
                            {hosting.hosting.title} -{" "}
                            {hosting.hosting.address?.city} -{" "}
                            {hosting.hosting.address?.countryState} - CheckIn:{" "}
                            {dayjs(hosting.dateStart).format("DD/MM/YYYY")} -{" "}
                            CheckOut:{" "}
                            {dayjs(hosting.dateEnd).format("DD/MM/YYYY")}
                          </Typography>
                          {hasMyRating ? (
                            <Rating
                              name="hover-feedback"
                              value={hasMyRating.scoreAssessment}
                              precision={0.5}
                              readOnly
                            />
                          ) : (
                            <Button
                              onClick={() =>
                                handleAvaliar(
                                  hosting.hosting.hostingId.toString(),
                                  RatingType.Accommodation
                                )
                              }
                            >
                              Avaliar
                            </Button>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                )}
                {buy.purchaseExperiences.length > 0 && (
                  <Box>
                    <Typography>
                      <PartyModeIcon /> Experiencia
                      {buy.purchaseExperiences.length > 1 ? "s" : ""}:{" "}
                    </Typography>
                    {buy.purchaseExperiences.map((experience) => {
                      const hasMyRating =
                        experience.experience.assessments?.find(
                          (assessment) => assessment.userId === userIdStorage
                        );
                      return (
                        <Box key={experience.experience.experienceId}>
                          <Typography>
                            {experience.experience.title} -{" "}
                            {experience.experience.address?.city} -{" "}
                            {experience.experience.address?.countryState} -
                            Data: {dayjs(experience.date).format("DD/MM/YYYY")}{" "}
                            -{" "}
                          </Typography>
                          {hasMyRating ? (
                            <Rating
                              name="hover-feedback"
                              value={hasMyRating.scoreAssessment}
                              precision={0.5}
                              readOnly
                            />
                          ) : (
                            <Button
                              onClick={() =>
                                handleAvaliar(
                                  experience.experience.experienceId.toString(),
                                  RatingType.Experience
                                )
                              }
                            >
                              Avaliar
                            </Button>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
      <ModalAssessments />
    </>
  );
}

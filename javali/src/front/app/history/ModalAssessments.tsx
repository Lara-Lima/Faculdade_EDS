import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  useQueryStates,
  parseAsString,
  parseAsStringEnum,
} from "next-usequerystate";
import { useRateAccommodation } from "@/utils/api/assessment/useRateAccommodation";
import { useRateExperience } from "@/utils/api/assessment/useRateExperience";
import { useReadAccommodation } from "@/utils/api/accommodation/useReadAccommodation";
import { useReadSingleExperience } from "@/utils/api/experience/useReadSingleExperience";
import { useUser } from "@/components/context/UserContext";
import { useQueryClient } from "@tanstack/react-query";

export enum RatingType {
  Accommodation = "accommodation",
  Experience = "experience",
}
export default function ModalAssessments({}) {
  const { userIdStorage } = useUser();
  const [value, setValue] = useState<number | null>(null);
  const [hover, setHover] = useState(-1);

  const [titleAssessment, setTitleAssessment] = useState("");
  const [descriptionAssessment, setDescriptionAssessment] = useState("");

  const [currentAssessmentIndex, setCurrentAssessmentIndex] = useState(0);

  const [openData, setOpenData] = useQueryStates({
    id: parseAsString,
    ratingType: parseAsStringEnum<RatingType>(Object.values(RatingType)),
  });
  const { id, ratingType } = openData;
  const open = Boolean(id && ratingType);
  const queryClient = useQueryClient();

  const { mutateAsync: mutateRateAccommodation } = useRateAccommodation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyBuys"],
      });
    },
  });
  const { mutateAsync: mutateRateExperience } = useRateExperience({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["readMyBuys"],
      });
    },
  });

  const { data: accomodationData, isLoading: isLoadingAccommodation } =
    useReadAccommodation({
      id: Number(openData.id),
      enabled: open,
    });
  const { data: experienceData, isLoading: isLoadingExperience } =
    useReadSingleExperience({
      id: Number(openData.id),
      enabled: open,
    });

  const loading = isLoadingAccommodation || isLoadingExperience;

  // Simule uma lista de avaliações pendentes (substitua isso pelos dados reais)
  // const pendingAssessments = useMemo(
  //   () => [
  //     { id: 1, accommodation: "Hospedagem 1" },
  //     { id: 2, accommodation: "Hospedagem 2" },
  //     // ... adicione mais avaliações conforme necessário
  //   ],
  //   []
  // );

  const labels: { [index: string]: string } = {
    0: "Desastroso",
    0.5: "Terrível",
    1: "Terrível+",
    1.5: "Ruim",
    2: "Ruim+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Bom",
    4: "Bom+",
    4.5: "Excelente",
    5: "Excelente+",
  };

  // const currentAssessment = pendingAssessments[currentAssessmentIndex];

  const handleAvaliar = () => {
    if (ratingType === RatingType.Accommodation) {
      mutateRateAccommodation({
        hostingId: Number(id),
        assessment: {
          descriptionAssessment,
          scoreAssessment: Number(value),
          titleAssessment,
          userId: userIdStorage!,
        },
      });
    }

    if (ratingType === RatingType.Experience) {
      mutateRateExperience({
        experienceId: Number(id),
        assessment: {
          descriptionAssessment,
          scoreAssessment: Number(value),
          titleAssessment,
          userId: userIdStorage!,
        },
      });
    }

    setOpenData({
      id: null,
      ratingType: null,
    });
  };

  // const handleNextAssessment = () => {
  //   // Lógica para avançar para a próxima avaliação
  //   if (currentAssessmentIndex < pendingAssessments.length - 1) {
  //     setCurrentAssessmentIndex(currentAssessmentIndex + 1);
  //     setValue(null); // Reinicia o valor da avaliação
  //     setShowFeedback(false);
  //   } else {
  //     setOpenData({
  //       id: undefined,
  //       ratingType: undefined,
  //     });
  //   }
  // };

  // const buttonText =
  //   currentAssessmentIndex < pendingAssessments.length - 1
  //     ? "Avaliar Próxima"
  //     : "Avaliar";

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const showFeedbackCondition = value !== null && value < 3;
  return (
    <Dialog
      open={open}
      onClose={() =>
        setOpenData({
          id: null,
          ratingType: null,
        })
      }
    >
      <DialogTitle id="alert-dialog-title">Avaliações Pendentes</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Avaliar as hospedagens e experiências que você já reservou é muito
          importante para a comunidade.
        </DialogContentText>

        {loading ? (
          <CircularProgress />
        ) : (
          (accomodationData || experienceData) && (
            <Box sx={{ display: "grid", gap: "16px", paddingTop: "16px" }}>
              <Typography variant="h6">
                O que você achou de{" "}
                {accomodationData?.title || experienceData?.title}?
              </Typography>
              <Box sx={{ display: "flex" }}>
                {" "}
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
              <TextField
                autoFocus
                margin="dense"
                id="titleAssessment"
                label="Titulo"
                type="text"
                fullWidth
                variant="outlined"
                value={titleAssessment}
                onChange={(e) => setTitleAssessment(e.target.value)}
              />
              {showFeedbackCondition && (
                <>
                  Notamos que você avaliou{" "}
                  {accomodationData?.title || experienceData?.title} em {value}{" "}
                  estrelas. Nos conte brevemente sobre sua experiência.
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Feedback"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={descriptionAssessment}
                    onChange={(e) => setDescriptionAssessment(e.target.value)}
                  />
                </>
              )}
            </Box>
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleAvaliar}>
          Avaliar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

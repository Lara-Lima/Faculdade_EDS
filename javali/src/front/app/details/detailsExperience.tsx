import Typography from "@mui/material/Typography";
import { Box, Rating } from "@mui/material";
import { Experience } from "@/utils/types/experience";
import { FC } from "react";

type DetailsExperienceProps = {
  experience: Experience;
};

export const DetailsExperience: FC<DetailsExperienceProps> = ({
  experience,
}) => {
  return (
    <Box>
      <Typography variant="h4" marginTop={"24px"} marginBottom={"12px"}>
        Descrição
      </Typography>

      <Typography variant="caption">{experience.title}</Typography>
      <Typography variant="h4" marginTop={"24px"} marginBottom={"12px"}>
        Avaliações
      </Typography>
      {experience.assessments?.map((assessment, key) => (
        <Box key={key} marginBottom={2}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Typography variant="h6">{assessment.userRate}</Typography>
            <Rating
              value={assessment.scoreAssessment}
              readOnly
              precision={1}
              size="small"
            />
          </Box>

          {assessment.descriptionAssessment && (
            <Typography variant="subtitle1">{assessment.descriptionAssessment}</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

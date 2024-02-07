"use client";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";

const labels: { [index: string]: string } = {
  1: "Insatisfatória",
  2: "Aceitável",
  3: "Satisfatório",
  4: "Muito Bom",
  5: "Excelente",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

type RatingProductProps = {
  defaultValue: number;
  onRate: (value: number, feedback?: string) => void;
};
export default function RatingProduct({
  onRate,
  defaultValue,
}: RatingProductProps) {
  const [value, setValue] = useState<number | null>(defaultValue);
  const [feedback, setFeedback] = useState<string>("");
  const [hover, setHover] = useState(-1);
  const [open, setOpen] = useState(false);

  const handleSendFeedBack = () => {
    onRate(value || 0, feedback);
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        title={value !== null ? labels[hover !== -1 ? hover : value] : ""}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
            if ((newValue || 0) > 3) {
              onRate(newValue || 0);
            }
            if ((newValue || 0) <= 3) {
              setOpen(true);
            }
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Envie seu feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notamos que você avaliou esse produto em {value} estrelas. Nos conte
            brevemente sobre sua experiencia.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Feedback"
            type="text"
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendFeedBack} variant="outlined">
            Não enviar feedback
          </Button>
          <Button onClick={handleSendFeedBack} variant="contained">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
